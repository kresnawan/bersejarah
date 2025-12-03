import React from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	Button,
	Link
} from "@heroui/react";

export default function Nav() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const menuItems = [
		{
			text: "Data",
			href: "/dashboard/data"
		},
		{
			text: "Tambah",
			href: "/dashboard/tambah"
		},
	];

	return (
		<Navbar
			onMenuOpenChange={setIsMenuOpen}
			isBlurred={false}
			className="fixed bg-primary w-full "
			isBordered
		>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden"
					content="Halo"
				/>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{
					menuItems.map((item, index) => (
						<NavbarItem>
							<Link className="text-foreground" href={item.href} key={index}>
								{item.text}
							</Link>
						</NavbarItem>
					))
				}
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<Link href="#">Login</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu className="bg-black">
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={index}>
						<Link
							className="w-full text-primary"
							color={
								"primary"
							}
							href={item.href}
							size="lg"
						>
							{item.text}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}