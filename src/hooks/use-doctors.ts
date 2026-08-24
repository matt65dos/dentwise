"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDoctor, getAvailableDoctors, getDoctors, updateDoctor } from "@/lib/actions/doctors";
import { Doctor } from "../../prisma/generated/client";
import { error } from "next/dist/build/output/log";

export const useGetDoctors = () => {
	return useQuery({
		queryKey: ['getDoctors'],
		queryFn: getDoctors,
	});
}

export const useCreateDoctor = (doctor: Doctor) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createDoctor,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getDoctors'],
			})
		},
		onError: () => console.log("Doctor created failed."),
	});
}

export const useUpdateDoctor = (doctor: Doctor) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateDoctor,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getDoctors'],
			});
			queryClient.invalidateQueries({
				queryKey: ['getAvailableDoctors'],
			})
		},
		onError: () => console.log("Failed to update doctor:", error),
	});
}

export const useAvailableDoctors = () => {
	return useQuery({
		queryKey: ['getAvailableDoctors'],
		queryFn: getAvailableDoctors,
	});
}