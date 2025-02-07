import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

let data = [];

const typeDefs = `#graphql
  type Data {
    id: ID!
    text: String
    completed: Boolean
  }
  
  type Query {
    list: [Data]
  }

  type Mutation {
    addTask(id:ID, text: String, completed:Boolean): Data
    removeTask(id:ID):Data
    toggleTask(id:ID, completed:Boolean): Data
  }
`;

const resolvers = {
  Query: {
    list: () => data,
  },
  Mutation: {
    addTask: (_, { id, text, completed }) => {
      const newTask = { id: id, text, completed };
      data.push(newTask);
      return newTask;
    },
    removeTask:(_, {id}) => {
        const newData = data.filter((task) => task.id != id);
        data = newData;
    },
    toggleTask:(_, {id, completed}) => {
        const toggleTaskData = data.map((task) => {
            if(task.id==id){
              return {...task, completed}
            }
            return task;
        });
        data = toggleTaskData;
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 5000,
  },
});

console.log(`🚀 Server ready at: ${url}`);
