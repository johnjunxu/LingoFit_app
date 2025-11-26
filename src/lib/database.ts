export async function getProfile(user: User): Promise<Profile | null> {
  // Retry logic to handle race condition on new user signup
  for (let i = 0; i < 3; i++) {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`id, email, persona`)
        .eq('id', user.id)
        .single();
      
      if (error && status !== 406) throw error;
      
      if (data) return data;

    } catch (error) {
       console.error(`Error getting profile (attempt ${i + 1}):`, error);
    }
    // Wait before retrying
    if (i < 2) await new Promise(res => setTimeout(res, 500));
  }
  return null;
}
