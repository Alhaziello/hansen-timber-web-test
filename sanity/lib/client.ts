import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Change this to true for the version that goes to Vercel
  useCdn: process.env.NODE_ENV === 'production',
})
