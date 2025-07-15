"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Car, Building2, Calendar, Plus, ArrowRight, TrendingUp, Users, DollarSign, Wrench } from 'lucide-react';
import { useDashboardCounts } from '@/src/lib/database-hooks';

export default function AdminDashboardHome() {
  const { counts, loading } = useDashboardCounts();

  const stats = [
    {
      name: 'Ongoing Projects',
      value: counts.ongoingProjects,
      icon: Building2,
      href: '/admin/ongoing-projects',
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
    },
    {
      name: 'Real Estate Deals',
      value: counts.realEstateDeals,
      icon: Car,
      href: '/admin/real-estate-deals',
      color: 'bg-green-500',
      textColor: 'text-green-500',
    },
    {
      name: 'Featured Services',
      value: counts.featuredServices,
      icon: Wrench,
      href: '/admin/featured-services',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-500',
    },
    {
      name: 'Team Members',
      value: counts.teamMembers,
      icon: Users,
      href: '/admin/team-members',
      color: 'bg-purple-500',
      textColor: 'text-purple-500',
    },
  ];

  const quickActions = [
    {
      name: 'Add New Project',
      href: '/admin/ongoing-projects/new',
      icon: Building2,
      description: 'Create a new construction project',
    },
    {
      name: 'Add Real Estate Deal',
      href: '/admin/real-estate-deals/new',
      icon: Car,
      description: 'Add a new property listing',
    },
    {
      name: 'Add Featured Service',
      href: '/admin/featured-services/new',
      icon: Wrench,
      description: 'Create a new service offering',
    },
    {
      name: 'View Bookings',
      href: '/admin/bookings',
      icon: Calendar,
      description: 'Check recent inquiries',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#B8860B]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#001934]">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to Stratum Tech Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-[#001934]">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href={stat.href}
                className="text-sm text-[#B8860B] hover:text-[#B8860B]/80 font-medium flex items-center"
              >
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#001934]">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="block p-4 border border-gray-200 rounded-lg hover:border-[#B8860B] hover:shadow-md transition-all"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-[#B8860B]/10 rounded-lg">
                    <action.icon className="h-5 w-5 text-[#B8860B]" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-[#001934]">{action.name}</h3>
                    <p className="text-xs text-gray-500">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#001934]">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-[#001934]">New Project Added</p>
                  <p className="text-xs text-gray-500">Kololo Luxury Estate project was created</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-[#001934]">New Real Estate Deal</p>
                  <p className="text-xs text-gray-500">Furnished apartment in Kyanja added</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Wrench className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-[#001934]">Service Updated</p>
                  <p className="text-xs text-gray-500">Architecture Design service was modified</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 