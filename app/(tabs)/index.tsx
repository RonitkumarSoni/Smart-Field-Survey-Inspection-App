import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.profileIcon}>
          <Ionicons name="person-circle-outline" size={32} color="#1D3D47" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Screen & Student Details */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.studentName}>John Doe</Text>
          <Text style={styles.studentId}>ID: STD-10293</Text>
        </View>

        {/* Today's Survey Count */}
        <View style={styles.statsCard}>
          <View style={styles.statsInfo}>
            <Text style={styles.statsTitle}>Today's Surveys</Text>
            <Text style={styles.statsCount}>12</Text>
          </View>
          <Ionicons name="document-text" size={40} color="#0a7ea4" />
        </View>

        {/* Quick Action Cards */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/(tabs)/explore')}>
            <Ionicons name="add-circle" size={32} color="#0a7ea4" />
            <Text style={styles.actionText}>New Survey</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="camera" size={32} color="#0a7ea4" />
            <Text style={styles.actionText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="location" size={32} color="#0a7ea4" />
            <Text style={styles.actionText}>Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="people" size={32} color="#0a7ea4" />
            <Text style={styles.actionText}>Contacts</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Survey Summary */}
        <Text style={styles.sectionTitle}>Recent Surveys</Text>
        <View style={styles.recentList}>
          <View style={styles.recentItem}>
            <View style={styles.recentItemLeft}>
              <Text style={styles.recentItemTitle}>Site A Inspection</Text>
              <Text style={styles.recentItemDate}>Oct 24, 2023</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Completed</Text>
            </View>
          </View>
          <View style={styles.recentItem}>
            <View style={styles.recentItemLeft}>
              <Text style={styles.recentItemTitle}>Client B Survey</Text>
              <Text style={styles.recentItemDate}>Oct 23, 2023</Text>
            </View>
            <View style={[styles.statusBadge, styles.statusPending]}>
              <Text style={[styles.statusText, styles.statusTextPending]}>Pending</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  profileIcon: {
    padding: 5,
  },
  scrollContent: {
    padding: 20,
  },
  welcomeSection: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: '#718096',
  },
  studentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginTop: 4,
  },
  studentId: {
    fontSize: 14,
    color: '#A0AEC0',
    marginTop: 2,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statsInfo: {},
  statsTitle: {
    fontSize: 16,
    color: '#4A5568',
  },
  statsCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0a7ea4',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  actionText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
  },
  recentList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  recentItemLeft: {},
  recentItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  recentItemDate: {
    fontSize: 13,
    color: '#A0AEC0',
    marginTop: 4,
  },
  statusBadge: {
    backgroundColor: '#C6F6D5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    color: '#22543D',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusPending: {
    backgroundColor: '#FEEBC8',
  },
  statusTextPending: {
    color: '#7B341E',
  },
});
