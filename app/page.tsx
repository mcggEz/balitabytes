
  type NewsItem = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
  }

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "News 1",
      description: "Description 1",
      imageUrl: "https://via.placeholder.com/150",
      link: "https://www.google.com"
    },
    {
      id: 2,
      title: "News 2",
      description: "Description 2",
      imageUrl: "https://via.placeholder.com/150",
      link: "https://www.google.com"
    }
  ] 

export default function Home() {
  return (

  
   <>

      <div className="bg-red-500 p-5">
      <div className="text-4xl font-bold">Balitabytes</div>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
      <div className="text-2xl font-bold p-5">Welcome to Balitabytes</div>
      <div className="text-sm text-gray-500">Today's date is {new Date().toLocaleDateString()}</div>
      <input type="date" />
      <div>
      <input className="border-2 border-gray-300 rounded-md p-2" type="text" placeholder="So what news do you want to hear about" />
      
      <button className="bg-blue-500 text-white p-2 rounded-md">Search</button>
      </div>
      </div>
        {/* news component */}
        <div className="p-5 flex gap-2">
          {newsItems.map((newsItem) => (
            <div className="bg-blue-200 p-5 h-50 w-50 rounded-md hover:bg-blue-300"  key={newsItem.id}>
            <div>Title: {newsItem.title}</div>
            <div>Description: {newsItem.description}</div>
            <div>Image: {newsItem.imageUrl}</div>
            <div>Link:  <a href={newsItem.link}>{newsItem.link}</a></div>
          </div>  
          ))}
       
        </div>
   </>
  );
}
