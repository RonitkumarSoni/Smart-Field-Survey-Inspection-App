import React, { createContext, useContext, useState } from 'react'

const SurveyContext = createContext()

export function SurveyProvider({ children }) {
  const [surveys, setSurveys] = useState([
    {
      id: '1',
      siteName: 'Site A - North Block',
      clientName: 'XYZ Corp',
      description: 'Initial inspection of the north block area',
      priority: 'High',
      date: '2026-07-18',
      photo: null,
      contactName: 'Ravi Kumar',
      contactPhone: '+91 9876543210',
      latitude: '19.0760',
      longitude: '72.8777',
      notes: 'Foundation work looks good',
      status: 'submitted',
      createdAt: '2026-07-17T10:30:00',
    },
    {
      id: '2',
      siteName: 'Site B - South Wing',
      clientName: 'ABC Industries',
      description: 'Safety inspection for south wing construction',
      priority: 'Medium',
      date: '2026-07-17',
      photo: null,
      contactName: 'Priya Sharma',
      contactPhone: '+91 9123456789',
      latitude: '18.5204',
      longitude: '73.8567',
      notes: 'Need to check electrical work',
      status: 'submitted',
      createdAt: '2026-07-16T14:00:00',
    },
  ])

  const [currentSurvey, setCurrentSurvey] = useState(null)

  // add a new survey
  const addSurvey = (survey) => {
    const newSurvey = {
      ...survey,
      id: Date.now().toString(),
      status: 'draft',
      createdAt: new Date().toISOString(),
    }
    setSurveys(prev => [newSurvey, ...prev])
    setCurrentSurvey(newSurvey)
    return newSurvey
  }

  // delete survey by id
  const deleteSurvey = (id) => {
    setSurveys(prev => prev.filter(s => s.id !== id))
  }

  // update a survey
  const updateSurvey = (id, updates) => {
    setSurveys(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
  }

  // submit a survey
  const submitSurvey = (id) => {
    updateSurvey(id, { status: 'submitted' })
  }

  return (
    <SurveyContext.Provider value={{
      surveys,
      currentSurvey,
      setCurrentSurvey,
      addSurvey,
      deleteSurvey,
      updateSurvey,
      submitSurvey,
    }}>
      {children}
    </SurveyContext.Provider>
  )
}

// custom hook to use surveys
export function useSurveys() {
  return useContext(SurveyContext)
}
