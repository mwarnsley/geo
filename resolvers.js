const user = {
    _id: '1',
    name: 'Marcus',
    email: 'marcus.warnsley@gmail.com',
    picture: 'https://www.cloudinary.com/asdf'
};

module.exports = {
    Query: {
        me: () => {
            return user;
        }
    }
};
