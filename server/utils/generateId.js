import Counter from '../models/Counter.js';

const getNextSequence = async (sequenceName, prefix, padding = 4) => {
  const counter = await Counter.findOneAndUpdate(
    { id: sequenceName },
    { $inc: { seq: 1 } },
    { 
      returnDocument: 'after', // <-- This fixes your warning!
      upsert: true 
    }
  );

  const paddedSeq = String(counter.seq).padStart(padding, '0');
  return `${prefix}-${paddedSeq}`;
};

export default getNextSequence;