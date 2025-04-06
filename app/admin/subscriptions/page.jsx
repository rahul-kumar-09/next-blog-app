'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Page = () => {
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('/api/email')
      if (response.data.success) {
        setSubscriptions(response.data.data)
      } else {
        toast.error('Failed to fetch subscriptions')
      }
    } catch (error) {
      toast.error('Error fetching subscriptions')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Email Subscriptions</h1>
      {loading ? (
        <p>Loading...</p>
      ) : subscriptions.length === 0 ? (
        <p>No subscriptions found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Date Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, index) => (
                <tr key={sub._id || index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{sub.email}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(sub.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Page