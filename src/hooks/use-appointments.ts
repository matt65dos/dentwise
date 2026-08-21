"use client";

import {
	bookAppointment,
	getAppointments,
	getBookedTimeSlots,
	getUserAppointments,
} from "@/lib/actions/appointments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAppointments() {
	return useQuery({
		queryKey: ["getAppointments"],
		queryFn: getAppointments,
	});
}

export function useBookedTimeSlots(doctorId: string, date: string) {
	return useQuery({
		queryKey: ["getBookedTimeSlots"],
		queryFn: () => getBookedTimeSlots(doctorId!, date),
		enabled: !!doctorId && !!date, // only run query if both doctorId and date are provided
	});
}

export function useBookAppointment() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: bookAppointment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getUserAppointments"] });
		},
		onError: (error) => console.error("Failed to book appointment:", error),
	});
}

// Get user-specific appointments
export function useUserAppointments() {
	return useQuery({
		queryKey: ["getUserAppointments"],
		queryFn: getUserAppointments,
	});
}