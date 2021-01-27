import { useSocialContext } from "../../Modules/Social/SocialProvider";
import NavBar from "../Components/Bars/NavBar";
import PersonCard from "../Components/Cards/PersonCard";

const HomePage = () => {
  const { closePeople } = useSocialContext();

  return (
    <main className="flex h-screen w-screen bg-onTerceary font-sans text-white">
      <NavBar />
      <div className="mx-auto mt-16 flex flex-col">
        <div className="overflow-x-scroll flex flex-row w-screen">
          {closePeople?.map((person, index) => {
            return (
              <PersonCard
                key={index}
                username={person.username}
                name={person.name}
                picture={person.picture}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
