import { useMongoDB } from "../store/mongodb";

const TestMongo = (props) => {
    const { db } = useMongoDB();

    const addMovie = async (movie ) => {
        console.log(`adding `, movie.title);
    
        //const genres = getGenres(movie.genre_ids);
        await db
          .collection("movies")
          .insertOne({
            id: movie.id,
            title: movie.title,
            genres: "comedie",
            posterpath: movie.poster_path,
            overview: movie.overview,
            voteaverage: Number(movie.vote_average),
            watched: Math.random()>0.5,
          })
          .then((result) =>
            console.log(`Successfully inserted item with _id: ${result.insertedId}`)
          )
          .catch((err) => console.error(`Failed to insert item: ${err}`));
      };

      const onClickHandler = () => {
        addMovie({id:Math.random()*1000,title:"Harry Potter and the Philosopher's Stone",poster_path:"/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",overview:"Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard -- with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths -- and about the villain who's to blame.",vote_average:Math.random()*10});
      }

      return(<button onClick = {onClickHandler}>Add movies</button>);
}

export default TestMongo;