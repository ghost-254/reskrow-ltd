import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ProfileForm, { ProfileFormProps } from '@/components/ProfileForm'

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const profileFormProps: ProfileFormProps = {
    user,
    profile,
  }

  return <ProfileForm {...profileFormProps} />
}

