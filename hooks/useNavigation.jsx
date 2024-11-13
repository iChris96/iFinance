import { useRouter } from "expo-router";

const useNavigation = () => {
  const router = useRouter();

  const navigateWithPath = (pathname) => router.push({ pathname });

  return {
    navigateWithPath,
  };
};

export default useNavigation;
