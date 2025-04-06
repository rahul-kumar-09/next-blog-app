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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        const response = await axios.delete(`/api/email?id=${id}`)
        if (response.data.success) {
          toast.success(response.data.msg)
          // Remove the deleted subscription from the state
          setSubscriptions(subscriptions.filter(sub => sub._id !== id))
        } else {
          toast.error(response.data.msg || 'Failed to delete subscription')
        }
      } catch (error) {
        toast.error(error.response?.data?.msg || 'Error deleting subscription')
        console.error(error)
      }
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
          <table className='w-full text-sm text-gray-500 border-l border-gray-500 border-r'>
            <thead className='text-sm bg-gray-700 text-left uppercase'>
              <tr className=" text-left">
                <th scope='col' className=' px-6 py-3'>Email</th>
                <th scope='col' className=' px-6 py-3'>Date Subscribed</th>
                <th scope='col' className=' px-6 py-3'>Actions</th>
              </tr>
            </thead>
            <tbody >
              {subscriptions.map((sub, index) => (
                <tr key={sub._id || index} className="hover:bg-gray-50 text-left py-5">
                  <td className="py-5 px-4 border-b">{sub.email}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(sub.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(sub._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
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