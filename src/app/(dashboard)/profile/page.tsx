import { auth } from "@app/auth";
import { User } from "@app/models";
import { getUserById } from "@app/features/dashboard/actions";
import { ProfileUpdate } from "@app/features/dashboard/components";

const ProfilePage = async () => {
  const session = await auth();
  const user = (await getUserById(session?.user?.id as string)) as User;

  return (
    <ProfileUpdate imageUrl={session?.user?.image as string} user={user} />
  );
};

export default ProfilePage;
