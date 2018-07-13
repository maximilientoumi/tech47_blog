const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    
    user: (_, args, context, info) => {
      return context.prisma.query.user(
        {
          where: {
            id: args.id,
          },
        },
        info,
      )
    },
    users: (_, args, context, info) =>{
        return context.prisma.query.users(
        info,
      )
    }
  },
  Mutation: {
    signup: (_, args, context, info) => {
        return context.prisma.mutation.createUser(
        {
          data: {
            name: args.name,
          },
        },
        info,
      )
    }
  }
}

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/max237-27f373/blog01/dev',
    }),
  }),
})
server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))