class Storage {
    getStorage = (key) => {
        return JSON.parse(localStorage.getItem(key))
    }

    setStorage = (key,val) => {
        return localStorage.setItem(key , JSON.stringify(val))
    }
}

const storage = new Storage();

export default storage;