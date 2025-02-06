import { Appointment, PrismaClient, Salon, Service } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getSalons: async (): Promise<Salon[]> => {
      return await prisma.salon.findMany({ include: { services: true } });
    },
    getSalon: async (
      _: unknown,
      { id }: { id: string }
    ): Promise<Salon | null> => {
      return await prisma.salon.findUnique({
        where: { id },
        include: { services: true },
      });
    },

    getServices: async (
      _: unknown,
      { salonId }: { salonId: string }
    ): Promise<Service[]> => {
      return await prisma.service.findMany({ where: { salonId } });
    },
    getService: async (
      _: unknown,
      { id }: { id: string }
    ): Promise<Service | null> => {
      return await prisma.service.findUnique({ where: { id } });
    },

    getAppointments: async (): Promise<Appointment[]> => {
      return await prisma.appointment.findMany({ include: { salon: true } });
    },
    getAppointment: async (
      _: unknown,
      { id }: { id: string }
    ): Promise<Appointment | null> => {
      return await prisma.appointment.findUnique({
        where: { id },
        include: { salon: true },
      });
    },

    getTodaysAppointments: async (): Promise<Appointment[]> => {
      const now = new Date();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      return await prisma.appointment.findMany({
        where: {
          appointmentTime: {
            gte: now,
            lt: tomorrow,
          },
        },
        include: { salon: true },
      });
    },

    getTodaysAppointmentsSummary: async (): Promise<{
      numberOfAppointments: number;
      numberOfServices: number;
      expectedRevenue: number;
    }> => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const appointments = await prisma.appointment.findMany({
        where: {
          appointmentTime: {
            gte: today,
            lt: tomorrow,
          },
        },
        include: { salon: true },
      });

      const numberOfAppointments = appointments.length;
      const numberOfServices = appointments.length; // Assuming one service per appointment
      const expectedRevenue = await appointments.reduce(
        async (totalPromise, appointment) => {
          const total = await totalPromise;
          const service = appointment.serviceName;
          const serviceData = await prisma.service.findFirst({
            where: { name: service },
          });
          const servicePrice = serviceData ? serviceData.price : 0;
          return total + servicePrice;
        },
        Promise.resolve(0)
      );

      return {
        numberOfAppointments,
        numberOfServices,
        expectedRevenue,
      };
    },
  },
  Mutation: {
    addSalon: async (
      _: unknown,
      { name, location }: { name: string; location: string }
    ): Promise<Salon> => {
      return await prisma.salon.create({ data: { name, location } });
    },
    updateSalon: async (
      _: unknown,
      { id, name, location }: { id: string; name?: string; location?: string }
    ): Promise<Salon> => {
      return await prisma.salon.update({
        where: { id },
        data: { name, location },
      });
    },
    deleteSalon: async (
      _: unknown,
      { id }: { id: string }
    ): Promise<boolean> => {
      await prisma.salon.delete({ where: { id } });
      return true;
    },

    addService: async (
      _: unknown,
      { salonId, name, price }: { salonId: string; name: string; price: number }
    ): Promise<Service> => {
      return await prisma.service.create({ data: { salonId, name, price } });
    },
    updateService: async (
      _: unknown,
      { id, name, price }: { id: string; name?: string; price?: number }
    ): Promise<Service> => {
      return await prisma.service.update({
        where: { id },
        data: { name, price },
      });
    },
    deleteService: async (
      _: unknown,
      { id }: { id: string }
    ): Promise<boolean> => {
      await prisma.service.delete({ where: { id } });
      return true;
    },

    addAppointment: async (
      _: unknown,
      {
        salonId,
        customerName,
        serviceName,
        appointmentTime,
      }: {
        salonId: string;
        customerName: string;
        serviceName: string;
        appointmentTime: string;
      }
    ): Promise<Appointment> => {
      return await prisma.appointment.create({
        data: {
          salonId,
          customerName,
          serviceName,
          appointmentTime: new Date(appointmentTime),
        },
      });
    },
    updateAppointment: async (
      _: unknown,
      {
        id,
        customerName,
        serviceName,
        appointmentTime,
      }: {
        id: string;
        customerName?: string;
        serviceName?: string;
        appointmentTime?: string;
      }
    ): Promise<Appointment> => {
      return await prisma.appointment.update({
        where: { id },
        data: {
          customerName,
          serviceName,
          appointmentTime: appointmentTime
            ? new Date(appointmentTime)
            : undefined,
        },
      });
    },
    deleteAppointment: async (
      _: unknown,
      { id }: { id: string }
    ): Promise<boolean> => {
      await prisma.appointment.delete({ where: { id } });
      return true;
    },
  },
};
