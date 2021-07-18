# `react-state-local-storage`

> A React TS hook that handles persistence in LocalStorage, returning a state you can use to perform component rendering.

## Installation

You can install it with:

```
npm install react-state-local-storage

// or

yarn add react-state-local-storage
```

## Import

```js
import { useLocalStorage } from 'react-state-local-storage';
```

## Usage
### `useLocalStorage(config: useLocalStorageConfig)`
```js
const storageData = useLocalStorage({
    baseName: "@yourAppName",
    initialData: {
        //...props
    }
});
```
Providing a type:
```typescript
interface UserInterface {
    name: string;
    lastaName: string;
    age: string;
}

interface ParentsInterface {
    motherName: string;
    fatherName: string;
}

interface LocalStorageInterface {
    user: UserInterface;
    parents: ParentsInterface;
}

// {...}

const storageData = useLocalStorage<LocalStorageInterface>({
    baseName: "@yourAppName",
    initialData: {
        // LocalStorageInterface props
    }
});
```

Now, `storageData` has:

- `data: T | null`: The data stored with <i>baseName</i> as key base name, with provided type or <i>any</i>. This is a state, so you can manager component rendering whenever it changes. This will be <i>null</i> if LocalStorage is clear;

- `setData(data: T | null): void`: The function that storing each prop of <i>data</i> param as a LocalStorage item with <i>baseName</i> as key base name. 

- `setItem<I>(key: string, item: I): void`: The function that storing <i>item</i> param inside the LocalStorage data with <i>baseName</i> as the key base name. The <i>key</i> param must be exactly the name of property you want to store;

- `removeItem(key: string): void`: The function that removing a item stored inside the LocalStorage data with <i>baseName</i> as the key base name. The <i>key</i> param must be exactly the name of property you want to remove;

- `clearStorage(): void`: The function that CLEANS ALL (KEEP IN MIND) your application's LocalStorage.

## Examples

#### `storageData.setData(data: T | null)`
```js
const user: {
    name: "Iam",
    lastName: "Costa",
    age: "24"
}

const parents: {
    motherName: "Francisca",
    fatherName: "Antônio",
}

storageData.setData({user, parents});
/* 
storageData.data.user = { name: "Iam", lastName: "Costa", age: "24" },
storageData.data.parents = {motherName: "Francisca", fatherName: "Antônio"}
*/
```

#### `storageData.setItem<I>(key: string, item: I)`
```js
const user: {
    name: "Iam",
    lastName: "Costa",
    age: "24"
}

storageData.setItem<UserInterface>("user", user);
// storageData.data.user = { name: "Iam", lastName: "Costa", age: "24" }
```

#### `storageData.removeItem(key: string)`
```js
storageData.removeItem("user");
// storageData.data.user = null
```

#### `storageData.clearStorage()`
```js
storageData.clearStorage();
// storageData.data = null
/* any other key previously provided will return null because 
all of your app's localStorage has been cleared, so be careful */
```


## Another way...
There are another hook you can use. The first version of this package with some limitations. Here a example:

```typescript
import { useLocalStoragePrototype } from 'react-state-local-storage'

// {...}

// This handles storage only in the provided key
const storageItem = useLocalStoragePrototype("@app/key");

const user: {
    name: "Iam",
    lastName: "Costa",
    age: "24"
}

// given functions
storageItem.setItem(user);
storageItem.removeItem();
storageItem.clearStorage();
```
>**Note**: In this case, although the <i>clearStorage</i> function clears the entire LocalStorage, it only returns the state (null value) of the given key, since one object of <i>useLocalStoragePrototype</i> handles only about it own key data.

## Take a look

Clone repository below:
```
git clone https://github.com/iamcosta/react-custom-local-storage-hook.git
```
Install dependecies:
```
npm install

// or 

yarn
```
Run:
```
npm run start

// or 

yarn start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Send me feedback
This is my first package and I'm trying to put all my love on it <3

## License

MIT @ Iam Barroso da Costa
