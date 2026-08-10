import Image from "next/image";
import { SignUpButton, SignUp, SignIn, SignOutButton, Show } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<Show when="signed-out">
				<SignUpButton mode='modal'>
					<Button
						className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
						Sign Up
					</Button>
				</SignUpButton>
			</Show>

			<Show when="signed-in">
				<SignOutButton>
					<Button>
						Logout
					</Button>
				</SignOutButton>
			</Show>
		</div>
	);
}
