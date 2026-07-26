import asyncHandler from "../utils/asyncHandler.js";
import {
  createEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
  getMyEventsService,
} from "../services/event.service.js";
import { uploadImage } from "../services/upload.service.js";

export const createEvent = asyncHandler(async (req, res) => {
  let bannerImage = null;

  if (req.file) {
    const uploadedImage = await uploadImage(req.file.buffer);
    bannerImage = uploadedImage.secure_url;
  }

  const event = await createEventService(
    {...req.body, bannerImage },
    req.user.id
  );

  res.status(201).json({
    success: true,
    event,
  });
});


export const getAllEvents = asyncHandler(async (req, res) => {
  const result = await getAllEventsService(req.query);

  res.status(200).json({
    success: true,
    ...result,
  });
});

export const getEventById = asyncHandler(async (req, res) => {
  const event = await getEventByIdService(req.params.id);

  res.status(200).json({
    success: true,
    event,
  });
});

export const getMyEvents = asyncHandler(async (req, res) => {
  const events = await getMyEventsService(req.user.id);

  res.status(200).json({
    success: true,
    events,
  });
});

export const updateEvent = asyncHandler(async (req, res) => {
  const event = await updateEventService(
    req.params.id,
    req.user.id,
    req.body
  );

  res.status(200).json({
    success: true,
    event,
  });
});

export const deleteEvent = asyncHandler(async (req, res) => {
  await deleteEventService(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    message: "Event deleted successfully",
  });
});