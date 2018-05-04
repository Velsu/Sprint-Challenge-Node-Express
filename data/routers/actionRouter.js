const express = require("express");

const router = express.Router();

const actionDb = require("../helpers/actionModel.js");
const projectDb = require("../helpers/projectModel.js");

router.get("/", (req, res) => {
  actionDb
    .get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({ error: "Error occured" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  actionDb
    .get(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({ error: "Error occured" });
    });
});

router.post("/", (req, res) => {
  const action = req.body;

  if (!action.project_id || !action.description) {
    res.status(400).json({ error: "Id and description are required" });
  } else if (action.description.length > 128) {
    res.status(400).json({ error: "Description can't exceed 128 characters" });
  } else {
    projectDb
      .get(action.project_id)
      .then(response => {
        actionDb
          .insert(action)
          .then(response => {
            res.status(200).json(response);
          })
          .catch(error => {
            res.status(500).json({ error: "Error occured" });
          });
      })
      .catch(error => {
        res.status(400).json({
          error: "Provided project id must link to existing project"
        });
      });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedAction = req.body;
  if (
    updatedAction.project_id &&
    updatedAction.description &&
    updatedAction.description.length <= 128
  ) {
    projectDb
      .get(updatedAction.project_id)
      .then(response => {
        actionDb
          .update(id, updatedAction)
          .then(response => {
            res.status(200).json(response);
          })
          .catch(error => {
            res.status(500).json({ error: "There was a server error" });
          });
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "Project id must link to valid project in database" });
      });
  } else {
    res
      .status(400)
      .json({ error: "Valid project id and description are required" });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  actionDb
    .remove(id)
    .then(response => {
      res.status(204).json({ message: "Action removed" });
    })
    .catch(error => {
      res.status(500).json({ error: "Error occured" });
    });
});

module.exports = router;
