import { supabase } from "../lib/supabase";

export const fetchSchedules = async (userId) => {
  const { data, error } = await supabase
    .from("schedules")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


export const createSchedule = async (userId, title, date, time) => {
  const { data, error } = await supabase.from("schedules").insert([
    {
      user_id: userId,
      title,
      date,
      time,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteSchedule = async (scheduleId) => {
    const { data, error } = await supabase
        .from("schedules")
        .delete()
        .eq("id", scheduleId);
    
    if (error) {
        throw new Error(error.message);
    }
    
    return data;
};

export const updateSchedule = async (scheduleId, updatedFields) => {
    const { data, error } = await supabase
        .from("schedules")
        .update(updatedFields)
        .eq("id", scheduleId);
    
    if (error) {
        throw new Error(error.message);
    }
    
    return data;
};