//sound from https://freesound.org/s/22627/
class Alarm extends Audio {
    name = 'alarm';
    path = `sound/${this.name}.flac`;
    
    // for IndexedDB
    db = {
        name: 'audios_db',
        objectStore: {
            name: 'audios_os',
            keyPath: 'name',
            indexName: 'flacBlob',
            record: {
                name: this.name,
                flacBlob: null
            }
        }
    }
    
    play3Times() {
        this.play();
        let counter = 1;
        this.onended = function () {
            if (counter < 3) {
                counter++;
                this.play();
            }
        };
    }
} 

export const alarm = new Alarm("");

// Store .flac file (blob) in IndexedDB
// Create an instance of a db object for us to store our database in
let db;

const request = window.indexedDB.open(alarm.db.name, 1);

request.addEventListener('error', () => console.error('Database failed to open'));

request.addEventListener('success', () => {
    console.log('Database opened successfully');

    db = request.result;
    init();
});

// Setup the database tables if this has not already have been done
request.addEventListener('upgradeneeded', e => {
    
    // Grab a reference to the opened database
    const db = e.target.result;

    const objectStore = db.createObjectStore(alarm.db.objectStore.name, { keyPath: alarm.db.objectStore.keyPath });

    // Define what data items the objectStore will contain (table collumns)
    objectStore.createIndex(alarm.db.objectStore.indexName, 
        alarm.db.objectStore.indexName,
        { unique: false }
    );

    console.log('Database setup complete');
});

function init() {
    const objectStore = db.transaction(alarm.db.objectStore.name)
                          .objectStore(alarm.db.objectStore.name);

    const request = objectStore.get(alarm.name);
    request.addEventListener('success', () => {
        if(request.result) {
            console.log('Taking audio from IDB');
            setAudioSrc(request.result[alarm.db.objectStore.indexName]);
        } else {
            fetchAudioFromNetwork();
        }
    });
}

function setAudioSrc(flacBlob) {
    const flacURL = URL.createObjectURL(flacBlob);
    alarm.src = flacURL;
}

function fetchAudioFromNetwork() {
    console.log("Fetching audio from network");

    fetch(alarm.path).then(response => response.blob()).then(flacBlob => {
        setAudioSrc(flacBlob);

        storeAudio(flacBlob);
    });
}

function storeAudio(flacBlob) {
    const objectStore = db.transaction(alarm.db.objectStore.name, 'readwrite')
                          .objectStore(alarm.db.objectStore.name);
    
    alarm.db.objectStore.record.flacBlob = flacBlob;
    const record = alarm.db.objectStore.record;

    const request = objectStore.add(record);

    request.addEventListener('success', () => console.log('Record additon attempt finished'));
    request.addEventListener('error', () => console.error(request.error));
}