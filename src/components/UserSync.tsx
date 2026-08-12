'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { syncUser } from "@/lib/actions/users";

export const UserSync = () => {
	const { isSignedIn, isLoaded } = useUser();

	const handleUserSync = async () => {
		if (isLoaded && isSignedIn) {
			try {
				await syncUser();
			} catch (error) {
				console.log('Failed to sync User', error);
			}
		}
	};

	useEffect(() => {
		handleUserSync();
	}, [isLoaded, isSignedIn]);

	return null;
};