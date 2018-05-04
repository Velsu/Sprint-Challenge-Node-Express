const express = require("express");

const router = express.Router();

const projectDb = require("../helpers/projectModel.js");

router.get("/", (req, res) => {
  projectDb
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
  projectDb
    .get(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({ error: "Error occured" });
    });
});

router.get("/:projectId/actions", (req, res) => {
  const projectId = req.params.projectId;
  projectDb
    .getProjectActions(projectId)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({ error: "Error occured" });
    });
});

router.post("/", (req, res) => {
  const project = req.body;
  if (!project.name || !project.description) {
    res.status(400).json({ error: "Please specify name and description" });
  } else if (project.name.length > 128 || project.description.length > 128) {
    res
      .status(400)
      .json({ error: "Name and description can't exceed 128 characters" });
  } else {
    projectDb
      .insert(project)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json({ error: "Error occured" });
      });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedProject = req.body;
  if (updatedProject.name && updatedProject.description) {
    projectDb
      .update(id, updatedProject)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).json({ error: "Error occured" });
      });
  } else {
    res.status(400).json({ error: "Name and Description can't be blank" });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  projectDb
    .remove(id)
    .then(response => {
      res.status(204).json(response);
    })
    .catch(error => {
      res.status(500).json({ error: "Error occured" });
    });
});

module.exports = router;
