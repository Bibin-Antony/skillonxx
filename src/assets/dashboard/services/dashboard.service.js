import api from './api';

export const dashboardService = {
  async getStudentInfo() {
    const { data } = await api.get('/student/info');
    return data;
  },

  async getRecentActivities() {
    const { data } = await api.get('/student/activities');
    return data;
  },

  async getUpcomingEvents() {
    const { data } = await api.get('/student/events');
    return data;
  },

  async getLearningPaths() {
    const { data } = await api.get('/student/learning-paths');
    return data;
  },

  async getAchievements() {
    const { data } = await api.get('/student/achievements');
    return data;
  },

  async getSkills() {
    const { data } = await api.get('/student/skills');
    return data;
  },

  async updateStudentInfo(info) {
    const { data } = await api.put('/student/info', info);
    return data;
  },

  async enrollInCourse(courseId) {
    const { data } = await api.post(`/student/courses/${courseId}/enroll`);
    return data;
  }
};