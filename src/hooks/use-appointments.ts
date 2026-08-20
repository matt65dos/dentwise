"use client";

import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/lib/actions/appointments";

export const useGetAppointments = () => {
	const result = useQuery({
		queryKey: ['getAppointments'],
		queryFn: getAppointments
	});

	return result;
}