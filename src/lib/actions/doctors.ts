"use server";

import { prisma } from "@/lib/prisma";
import { Doctor, Gender } from "../../../prisma/generated/client";
import { generateAvatar } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const getDoctors = async () => {
	try {
		const doctors = await prisma.doctor.findMany({
			include: {
				_count: { select: { appointments: true } },
			},
			orderBy: { createdAt: "desc" },
		});

		const doctorsWithAppointmentCounts = doctors.map((doctor) => {
			return {
				...doctor,
				appointmentsCount: doctor._count.appointments,
			}
		});

		return doctorsWithAppointmentCounts;
	} catch (e) {
		console.log('Error getting doctors', e);
		throw new Error("Failed to get doctors");
	}
};

interface CreateDoctorInput {
	name: string;
	email: string;
	phone: string;
	speciality: string;
	gender: Gender;
	isActive: boolean;
}

export const createDoctor = async (input: CreateDoctorInput): Promise<void> => {
	try {
		if (!input.name || !input.email) throw new Error("Name and email are required");

		const doctor = await prisma.doctor.create({
			data: {
				...input,
				imageUrl: generateAvatar(input.name, input.gender)
			}
		});

		revalidatePath("/admin");

		// @ts-ignore
		return doctor;
	} catch (error: any) {
		console.error("Error creating doctor:", error);

		// handle unique constraint violation (email already exists)
		if (error?.code === "P2002") {
			throw new Error("A doctor with this email already exists");
		}

		throw new Error("Failed to create doctor");
	}
}

interface UpdateDoctorInput extends Partial<CreateDoctorInput> {
	id: string;
}

export const updateDoctor = async (input: UpdateDoctorInput) => {
	try {
		if (!input.name || !input.email) throw new Error("Name and email are required");

		const currentDoctor = await prisma.doctor.findUnique({
			where: { id: input.id }, select: { email: true }
		});

		if (!currentDoctor) throw new Error("Doctor not found");

		// if email is changing, check if the new email already exists
		if (input.email !== currentDoctor.email) {
			const existingDoctor = await prisma.doctor.findUnique({
				where: { id: input.id }
			});

			if (existingDoctor) {
				throw new Error("Doctor with this email already exists");
			}
		}

		const doctor = await prisma.doctor.update({
			where: { id: input.id },
			data: {
				name: input.name,
				email: input.email,
				phone: input.phone,
				speciality: input.speciality,
				gender: input.gender,
				isActive: input.isActive,
			}
		});
		return doctor;
	} catch (error: any) {
		console.error("Error updating doctor:", error);
		throw new Error("Failed to update doctor:", error);
	}
}