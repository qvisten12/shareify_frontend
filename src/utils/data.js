export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;

  return query;
};

export const registeredUsersQuery = (email, password) => {
  const query = `*[_type == "user" && email == '${email}' && password == '${password}']`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "post" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            source,
            postedBy->{
              _id,
              email,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                email,
                image
              },
            },
          }`;
  return query;
};

export const feedQuery = `*[_type == "post"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      source,
      postedBy->{
        _id,
        email,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          email,
          image
        },
      },
    } `;

export const postDetailQuery = (postId) => {
  const query = `*[_type == "post" && _id == '${postId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title,
    about,
    category,
    source,
    postedBy->{
      _id,
      email,
      image
    },
   save[]{
      postedBy->{
        _id,
        email,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        email,
        image
      },
    }
  }`;
  return query;
};

export const postDetailMorePostQuery = (post) => {
  const query = `*[_type == "post" && category == '${post.category}' && _id != '${post._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    source,
    postedBy->{
      _id,
      email,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        email,
        image
      },
    },
  }`;
  return query;
};

export const userCreatedPostsQuery = (userId) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    source,
    postedBy->{
      _id,
      email,
      image
    },
    save[]{
      postedBy->{
        _id,
        email,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPostsQuery = (userId) => {
  const query = `*[_type == 'post' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    source,
    postedBy->{
      _id,
      email,
      image
    },
    save[]{
      postedBy->{
        _id,
        email,
        image
      },
    },
  }`;
  return query;
};

export const categories = [
  {
    name: "animals",
    image:
      "https://www.skansen.se/imager/www_skansen_se/uploads-aws/Djur/Lodjur_ABo_1c20cd1caa081c2c1d5e95d22ea58c8a.jpg",
  },
  {
    name: "photography",
    image:
      "https://www.citybreak.com/sites/cb_citybreak/files/styles/slide_large/public/ben-o-bro-wpU4veNGnHg-unsplash.jpg?h=41f55a5b&itok=xr1okfZF",
  },
  {
    name: "coding",
    image:
      "https://www.zdnet.com/a/img/resize/8ac0b62cfee25efbf4b4baa365a98bdec5e0cd59/2021/07/19/8a337c80-5ed6-43a1-98fb-b981d420890f/programming-languages-shutterstock-1680857539.jpg?width=1200&height=1200&fit=crop&auto=webp",
  },
];
