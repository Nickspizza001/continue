const user = {
    _id,
    name: {
        first,
        last
    },
    email,
    phoneNumber,
    username,
    password,
    bio,
    profilePhoto,
    role,
    subcription,
    disabled
}

const link =  {
    _id,
    owner,
    title,
    url,
    desc,
    type,
    icon,
    privacy
}

const page = {
    _id,
    title,
    links: [],
    analytics: {
        hits,
        likes,
        transactions
    }
}