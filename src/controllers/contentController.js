const contentService = require('../services/contentService');

const getAllContent = async (req, res) => {
  try {
    const content = await contentService.getAllContent();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContentById = async (req, res) => {
  try {
    const content = await contentService.getContentById(req.params.id);
    if (content) {
      res.status(200).json(content);
    } else {
      res.status(404).json({ error: 'Content not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createContent = async (req, res) => {
  try {
    const { course_modules } = req.body;
    const newContent = await contentService.createContent(course_modules);
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateContent = async (req, res) => {
  try {
    const { course_modules } = req.body;
    const updatedContent = await contentService.updateContent(req.params.id, course_modules);
    if (updatedContent) {
      res.status(200).json(updatedContent);
    } else {
      res.status(404).json({ error: 'Content not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteContent = async (req, res) => {
  try {
    const deletedContent = await contentService.deleteContent(req.params.id);
    if (deletedContent) {
      res.status(200).json(deletedContent);
    } else {
      res.status(404).json({ error: 'Content not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent
}; 