import { auth } from "@app/auth";
import { getUserById } from "@app/features/dashboard/actions";
import { ProfileUpdate } from "@app/features/dashboard/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "My book shelf management is an online book reading application that helps users conveniently borrow books.",
};

const ProfilePage = async () => {
  const session = await auth();
  const { data: user } = await getUserById(session?.user?.id as string);

  return (
    <ProfileUpdate imageUrl={session?.user?.image as string} user={user} />
  );
};

export default ProfilePage;
