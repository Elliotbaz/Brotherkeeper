const functions = require('firebase-functions');

exports.randomNumber = functions.https.onRequest((request, response) => {
  const number = Math.round(Math.random() * 100);
  response.send(number.toString());
});

var admin = require('firebase-admin');
const express = require('express');
const app = express();
var serviceAccount = require('./brother-skeepers-firebase-adminsdk-2cd2q-36364f0a06.json');
app.use(express.json());
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const cors = require("cors")({ origin: true });
exports.sendPush = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    console.log(req.body);
    const message = {
      notification: {
        title: 'Crime Post',
        body: 'brother-Keeper-p',
      },
      tokens: req.body.tokens,
      contentAvailable: true,
      // Required for background/quit data-only messages on Android
      priority: 'high',
    };

    admin
      .messaging()
      .sendMulticast(message)
      .then(result => {
        console.log('send successfully');
      })
      .catch(err => {
        console.log(err);
      });
  });
});
// app.post('/send-noti',(req,res)=>{

// })

// app.listen(3000,()=>{
//   console.log("server running")
// })

// import functions from '@react-native-firebase/functions';

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     functions()
//       .httpsCallable('listProducts')()
//       .then(response => {
//         setProducts(response.data);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return null;
//   }

//   // ...
// }

// exports.listProducts = functions.https.onCall(() => {
//     return [
//       /* ... */
//       // Return some data
//     ];
//   });
