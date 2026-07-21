import {
  createEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService, 
  deleteEventService,
} from "../services/event.service.js";

export const createEvent = async (req, res) => {
  try {
    const event = await createEventService(req.body, req.user.id);

    res.status(201).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await getAllEventsService();

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await getEventByIdService(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const event = await updateEventService(
      req.params.id,
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await deleteEventService(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};