// The query we are going to make in order to get the user
export const ME_QUERY = `
  {
    me {
      _id
      name
      email
      picture
    }
  }
`;

// Query to get all of the pins created
export const GET_PINS_QUERY = `
  {
    getPins {
      _id
      createdAt
      title
      image
      content
      latitude
      longitude
      author {
        _id
        name
        email
        picture
      }
      comments {
        text
        createdAt
        author {
          _id
          name
          picture
        }
      }
    }
  }
`;
