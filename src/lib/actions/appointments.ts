"use server";

import { prisma } from "@/lib/prisma";

export const getAppointments = async () => {
	try {
		const testAppointments = await prisma.appointment.findMany();
		console.log('=======> TEST Appointments', testAppointments);
		const appointments = await prisma.appointment.findMany({
			include: {
				user: {
					select: {
						firstName: true,
						lastName: true,
						email: true
					}
				},
				doctor: {
					select: {
						name: true,
						imageUrl: true,
					}
				}
			},
			orderBy: { createdAt: "desc" }
		});


		return appointments;
	} catch (error) {
		console.log(error);
		throw new Error("Error while getAppointments error");
	}
}