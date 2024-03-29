import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import { useRouter } from "next/dist/client/router";
import { format } from 'date-fns'; 

const Search = ({searchResult}) => {
    const router = useRouter();
    console.log(searchResult);
    const {location, startDate,endDate,noOfGuests} = router.query;

    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;


    return (
      <div>
        <Header placeholder={`${location} | ${range} | ${noOfGuests} Guests`} />
        <main className="flex">
          <section className="flex-grow pt-14 px-6">
            <p className="text-xs">
              {" "}
              300+ Stays -{range} - for {noOfGuests} Guests
            </p>
            <h1 className="text-3xl font-semibold mt-2 mb-6">
              {" "}
              Stays in {location}
            </h1>

            <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
              <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-grey-100 transition transform duration-100 ease-out">
                Cancellation Flexibility
              </p>
              <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-grey-100 transition transform duration-100 ease-out">
                Type of place
              </p>
              <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-grey-100 transition transform duration-100 ease-out">
                Price
              </p>
              <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-grey-100 transition transform duration-100 ease-out">
                Rooms and Beds
              </p>
              <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-grey-100 transition transform duration-100 ease-out">
                More filters
              </p>
            </div>

            <div className="flex flex-col">
              {searchResult.map(
                ({ img, location, title, description, star, price, total }) => (
                  <InfoCard
                    key={img}
                    img={img}
                    location={location}
                    title={title}
                    description={description}
                    start={star}
                    price={price}
                    total={total}
                  />
                )
              )}
            </div>
          </section>

          <section className="hidden xl:inline-flex xl:min-w-[600px]">
            <Map searchResult={searchResult} />
          </section>
        </main>
        <Footer />
      </div>
    );
}

export default Search;


export async function getServerSideProps(){
  const searchResult = await fetch("https://links.papareact.com/isz")
  .then(res => res.json());

  return {
    props: {
      searchResult,
    },
  };
}
