const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
  gender: {
    type: String
  },
  name: {
    title: {
      type: String
    },
    first: {
      type: String
    },
    last: {
      type: String
    }
  },
  location: {
    street: {
      number: {
        type: Number
      },
      name: {
        type: String
      }
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    },
    postcode: {
      type: Number
    },
    coordinates: {
      latitude: {
        type: String
      },
      longitude: {
        type: String
      }
    },
    timezone: {
      offset: {
        type: String
      },
      description: {
        type: String
      }
    }
  },
  email: {
    type: String
  },
  login: {
    uuid: {
      type: String
    },
    username: {
      type: String
    },
    password: {
      type: String
    },
    salt: {
      type: String
    },
    md5: {
      type: String
    },
    sha1: {
      type: String
    },
    sha256: {
      type: String
    }
  },
  dob: {
    date: {
      type: Date
    },
    age: {
      type: Number
    }
  },
  registered: {
    date: {
      type: Date
    },
    age: {
      type: Number
    }
  },
  phone: {
    type: String
  },
  cell: {
    type: String
  },
  id: {
    name: {
      type: String
    },
    value: {
      type: String
    }
  },
  picture: {
    large: {
      type: String
    },
    medium: {
      type: String
    },
    thumbnail: {
      type: String
    }
  },
  nat: {
    type: String
  },
  status: {
    type: String,
    enum: ['draft', 'trash', 'published']
  },
  imported_t: {
    type: Date
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User