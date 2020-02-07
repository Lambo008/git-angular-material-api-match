const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');
const uploadFormData = multer();
const app = express();
const url = require('url');

/* operations  */
const status = require('./response/operations/status');
const manager = require('./response/operations/manager');
const tableData = require('./response/operations/data');
const searchResult = require('./response/operations/result');

/* check_bills  */
const types = require('./response/check_bills/type');
const bills = require('./response/check_bills/bills');

/* format for buying */
const format = require('./response/format/format');

/* XML Reader */
const xml_response = require('./response/xml-reader/response');
const PATH = './backend/uploads/xml';

/* Activation */
const sps = require('./response/activations/sps');
const concert = require('./response/activations/concert');

/* Bancos */
const enviados = require('./response/bancos/enviados');
const filtrar = require('./response/bancos/filtrar');
const seleccionar = require('./response/bancos/seleccionar');
const bank = require('./response/bancos/bank');

/* Transfer */
const transfer = require('./response/transfer/transfers');

/* Configurar */
const configurar = require('./response/configurar/configurar');

/* Tasa */
const tasa = require('./response/tasa/tasa');

/* Formateo */
const formateoPath = './backend/uploads/formateo'

/* Subida */
const archivoPath = './backend/uploads/subida/archivo';
const ficheroPath = './backend/uploads/subida/fichero';

/* Administraciones Face */
const face = require('./response/admin/face');

/* Perdidas */
const perdidas = require('./response/perdidas/perdidas');
const loose = require('./response/perdidas/loose');

/* Consumo */
const prices = require('./response/consumo/prices');
const price_response = require('./response/consumo/price_response');

/* ATR */
const atr = require('./response/atr/atr');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

let upload = multer({
  storage: storage
});

let formateoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, formateoPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

let formateoUpload = multer({
  storage: formateoStorage
});

let archivoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, archivoPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

let archivoUpload = multer({
  storage: archivoStorage
});

let ficheroStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ficheroPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

let ficheroUpload = multer({
  storage: ficheroStorage
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(uploadFormData.array());
app.use(express.static('public'));




app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  ),
    next();
});

/* operations  */
app.get("/api/activations/operations/status", (req, res, next) => {
  res.status(200).json({
    data: status,
  });
});

app.get("/api/activations/operations/manager", (req, res, next) => {
  res.status(200).json({
    data: manager,
  });
});

app.get("/api/activations/operations/data", (req, res, next) => {
  res.status(200).json({
    data: tableData,
  });
});

app.post("/api/activations/operations/search", (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    data: searchResult,
  });
});

/* check_bills */
app.get("/api/activations/bills/type", (req, res, next) => {
  res.status(200).json({
    data: types,
  });
});

app.post("/api/activations/bills/bill", (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    data: bills,
  });
});


/* format for buying */
app.post("/api/activations/format/request", (req, res, next) => {
  const request = req.body;
  console.log(request);
  res.status(200).json({
    data: format,
  });
});

/* XML Reader */
app.post('/api/activations/xml-reader/next', upload.single('file'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
        KO: xml_response.KO,
    });

  } else {
    console.log('File is available!');
    return res.send({
        OK: xml_response.OK,
    })
  }
});

/* Activation */
app.post("/api/activations/activation/sps", (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    data: sps,
  });
});

app.post("/api/activations/activation/concert", (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    data: concert.flat_rate.log,
  });
});

/* Bancos */
app.get("/api/contabilidad/bancos/enviados", (req, res, next) => {
  res.status(200).json({
    enviados,
  })
})

app.get("/api/contabilidad/bancos/filtrar", (req, res, next) => {
  res.status(200).json({
    filtrar,
  })
})

app.get("/api/contabilidad/bancos/seleccionar", (req, res, next) => {
  res.status(200).json({
    seleccionar,
  })
})

app.get("/api/contabilidad/bancos/bank", (req, res, next) => {
  res.status(200).json({
    data: bank,
  })
})

app.post("/api/contabilidad/bancos/bank", (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    'message': 'OK',
  })
})

/* Transfer */
app.get("/api/contabilidad/transfer", (req, res, next) => {
  res.status(200).json({
    data: transfer,
  })
})

app.post("/api/contabilidad/transfer", (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    'message': 'OK',
  })
})

/* Configurar */
app.get("/api/contabilidad/configurar", (req, res, next) => {
  res.status(200).json({
    data: configurar,
  })
});

app.post("/api/contabilidad/configurar", (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    data: req.body,
  })
});

/* Diamacon */
app.post("/api/contabilidad/diamacon", (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    'message': req.body.from + ' ~ ' + req.body.until,
  })
})

/* Impuesto */
app.post("/api/contabilidad/impuesto", (req, res, next) => {
  console.log(req.body)
  res.status(200).json({
    'message': req.body,
  })
})

/* Exportar */
app.post("/api/contabilidad/exportar-clientes", (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    'message': req.body,
  })
});

/* Tasa */
app.post("/api/contabilidad/tasa", (req, res, next) => {
  console.log(req.body);
  if (req.body.summary == '1') {
    res.status(200).json({
      summary: tasa.summary,
      tasa_municipal: tasa.tasa_municipal,
      check: 1,
    });
  }
  else {
    res.status(200).json({
      cups_bills: tasa.cups_bills,
      check: 0,
      rates: tasa.rates,
    })
  }
});

/* Formateo */
app.post('/api/contabilidad/formateo-viesgo', formateoUpload.single('file'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
        KO: xml_response.KO,
    });

  } else {
    console.log('File is available!');
    return res.send({
        OK: xml_response.OK,
    })
  }
});

/* Subida */
app.post('/api/contabilidad/subida/archivo', archivoUpload.single('file'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
        KO: xml_response.KO,
    });

  } else {
    console.log('File is available!');
    return res.send({
        OK: xml_response.OK,
    })
  }
});

app.post('/api/contabilidad/subida/fichero', ficheroUpload.single('file'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
        KO: xml_response.KO,
    });

  } else {
    console.log('File is available!');
    return res.send({
        OK: xml_response.OK,
    })
  }
});

/* Administraciones Face */
app.post('/api/facturacion/administraciones-face', (req, res, next) => {
  console.log(req.body)
  res.status(200).json({
    'message': 'OK',
  });
});

app.get('/api/facturacion/administraciones-face', (req, res, next) => {
  res.status(200).json({
    data: face,
  })
})

app.post('/api/facturacion/administraciones-face/delete', (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    'message': 'Deleted',
  });
});

/* Perdidas */
app.get('/api/facturacion/perdidas/date', (req, res, next)  => {
  res.status(200).json({
    perdidas,
  })
})

app.get('/api/facturacion/perdidas/loose', (req, res, next)  => {
  res.status(200).json({
    loose,
  })
})

app.get('/api/facturacion/perdidas/dateloose', (req, res, next)  => {
  params = url.parse(req.url, true)
  console.log(params.query)
  res.status(200).json({
    loose,
  })
})

app.post('/api/facturacion/perdidas/guardar', (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    'message':  'OK',
  })
})



/* Consumo */
app.get('/api/facturacion/consumo/prices', (req, res, next) => {
  res.status(200).json({
    prices,
  })
});

app.post('/api/facturacion/consumo/prices', (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    price_response
  })
});

app.post('/api/facturacion/consumo/insert', (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    'message': 'OK',
  })
});

/* ATR */
app.get('/api/facturacion/atr', (req, res, next) => {
  res.status(200).json({
    atr
  })
});

app.post('/api/facturacion/atr/potencia', (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    'message': 'OK'
  })
});

app.post('/api/facturacion/atr/atr', (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    'message': 'OK'
  })
});

app.post('/api/facturacion/atr/base', (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    'message': 'OK'
  })
});

module.exports = app;
