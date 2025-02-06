import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getAppointments: async () =>
      await prisma.appointment.findMany({ include: { salon: true } }),
  },
  Mutation: {
    addAppointment: async (
      _: any,
      { salonId, customerName, serviceName, appointmentTime }: any
    ) => {
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
      _: any,
      { id, customerName, serviceName, appointmentTime }: any
    ) => {
      return await prisma.appointment.update({
        where: { id },
        data: {
          customerName,
          serviceName,
          appointmentTime: new Date(appointmentTime),
        },
      });
    },
    deleteAppointment: async (_: any, { id }: any) => {
      await prisma.appointment.delete({ where: { id } });
      return true;
    },
  },
};
