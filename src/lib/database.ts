import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';
import { Flashcard } from '../types';

export type Profile = {
  id: string;
  email?: string | null;
  persona?: string | null;
};

export async function getProfile(user: User): Promise<Profile | null> {
  try {
    const { data, error, status } = await supabase
      .from('profiles')
      .select(`id, email, persona`)
      .eq('id', user.id)
      .single();

    if (error && status !== 406) throw error;
    return data;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
}

export async function createProfile(user: User) {
  try {
    const { error } = await supabase.from('profiles').insert({
      id: user.id,
      email: user.email,
    });
    if (error) throw error;
    console.log('Profile created for new user.');
  } catch (error) {
    console.error('Error creating profile:', error);
  }
}

export async function updatePersona(userId: string, persona: string) {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ persona: persona, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) throw error;
    console.log('Persona updated successfully!');
  } catch (error) {
    console.error('Error updating persona:', error);
  }
}

export async function getFlashcards(userId: string): Promise<Flashcard[]> {
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    
    const flashcards = data?.map(card => ({
        ...card,
        id: String(card.id),
        nextReviewDate: card.next_review_date || new Date().toISOString()
    })) || [];
    
    return flashcards as Flashcard[];
  } catch (error) {
    console.error('Error getting flashcards:', error);
    return [];
  }
}

export async function getUserStats(userId: string) {
    try {
        const { data: flashcards, error: flashcardsError } = await supabase
            .from('flashcards')
            .select('status, created_at')
            .eq('user_id', userId);

        if (flashcardsError) throw flashcardsError;

        const totalXp = (flashcards?.length || 0) * 10;
        const itemsToReview = flashcards?.filter(c => c.status === 'reviewing' || c.status === 'new').length || 0;
        const streakDays = new Set(flashcards?.map(c => c.created_at ? new Date(c.created_at).toDateString() : '')).size;

        return {
            totalXp,
            itemsToReview,
            streakDays,
            sessionsCompletedToday: 0,
        };

    } catch (error) {
        console.error('Error getting user stats:', error);
        return { totalXp: 0, itemsToReview: 0, streakDays: 0, sessionsCompletedToday: 0 };
    }
}
