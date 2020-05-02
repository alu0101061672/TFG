import Event from "../models/event";

function signUpEvent(req, res) {
  const event = new Event({
    type_event: req.body.type_event,
    risk: req.body.risk,
    icon: req.body.icon,
    lat: req.body.lat,
    lon: req.body.lon,
    description: req.body.description,
  });

  event.save((err) => {
    if (err)
      return res.status(500).send({
        message: `Error al crear el evento: ${err}`,
      });
    return res.status(201).send({
      message: `¡Se ha introducido un evento nuevo! `,
    });
  });
}

function showEvent(req, res) {
  Event.find({}).then((event) => {
    if (!event)
      return res.status(404).send({
        message: "Este evento no está en al BBDD",
      });

    res.status(200).send({
      message: "Mostrando evento",
      event: event,
    });
  });
}

function editEvent(req, res) {
  Event.findOneAndUpdate(
    {
      idEvent: req.body.idEvent,
    },
    {
      type_event: req.body.type_event,
      risk: req.body.risk,
      description: req.body.description,
      icon: req.body.icon,
    }
  ).then((event, err) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la peticion ${err}`,
      });

    return res.status(200).send({
      message: `El evento se ha editado con éxito`,
      event: event,
    });
  });
}

function deleteInfo(req, res) {
  Event.findOneAndDelete({ idEvent: req.body.idEvent }).then((event, err) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la petición ${err}`,
      });

    return res.status(200).send({
      message: `Se ha eliminado el evento con éxito`,
      id: event,
    });
  });
}

module.exports = {
  showEvent,
  signUpEvent,
  deleteInfo,
  editEvent,
};
