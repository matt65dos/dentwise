"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDoctor, getDoctors, updateDoctor } from "@/lib/actions/doctors";
import { Doctor } from "../../prisma/generated/client";
import { error } from "next/dist/build/output/log";

export const useGetDoctors = () => {
	const result = useQuery({
		queryKey: ['getDoctors'],
		queryFn: getDoctors,
	});

	return result;
}

export const useCreateDoctor = (doctor: Doctor) => {
	const queryClient = useQueryClient();
	const result = useMutation({
		mutationFn: createDoctor,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getDoctors'],
			})
		},
		onError: () => console.log("Doctor created failed."),
	});

	return result;
}

export const useUpdateDoctor = (doctor: Doctor) => {
	const queryClient = useQueryClient();
	const result = useMutation({
		mutationFn: updateDoctor,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getDoctors'],
			})
		},
		onError: () => console.log("Failed to update doctor:", error),
	});

	return result;
}