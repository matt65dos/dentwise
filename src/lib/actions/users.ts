'use server';

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function syncUser() {
	try {
		const user = await currentUser();

		if (!user) return;

		const existingUser = await prisma.user.findUnique({
			where: { clerkId: user.id },
		});

		if (existingUser) return existingUser;

		const dbUser = await prisma.user.create({
			data: {
				clerkId: user.id as string,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.emailAddresses[0].emailAddress,
				phone: user.phoneNumbers[0]?.phoneNumber,

			},
		});

		return dbUser;
	} catch (err) {
		console.log("Error syncing user", err);
	}
}