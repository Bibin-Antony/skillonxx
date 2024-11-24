// components/WorkshopMaterials.jsx
import React, { useState, useEffect } from 'react';
import { FileText, Download } from 'lucide-react';

const WorkshopMaterials = ({ workshop, token, studentId }) => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (workshop?._id) {
      // console.log('.....student id...... ', studentId)
      // console.log('.....workshop id...... ', workshop._id)
      fetchMaterials();
    }
  }, [workshop?._id]);

  const fetchMaterials = async () => {
    try {
      const response = await fetch(`https://skillonx-server.onrender.com/workshops/${workshop._id}/materials?studentId=${studentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      // console.log(data)
      if (response.status === 403) {
        setIsRegistered(false);
        setError('You need to register for this workshop to access materials');
        return;
      }

      if (data.success) {
        setMaterials(data.materials);
        setIsRegistered(true);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch materials');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (materialId) => {
    try {
      const response = await fetch(
        `https://skillonx-server.onrender.com/workshops/materials/${materialId}/download?studentId=${studentId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Download failed');
      }

      // Get the blob with the correct type from response headers
      const contentType = response.headers.get('content-type');
      const blob = await response.blob();

      // Create a new blob with the correct type
      const file = new Blob([blob], { type: contentType });

      // Create download link
      const url = window.URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;

      // Get filename from header
      const contentDisposition = response.headers.get('content-disposition');
      let filename = 'download';
      if (contentDisposition) {
        const matches = /filename="(.+)"/.exec(contentDisposition);
        if (matches) {
          filename = matches[1];
        }
      }

      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      // console.error('Download error:', error);
      setError('Failed to download material');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Workshop Materials</h3>
      {materials.length === 0 ? (
        <p className="text-gray-400">No materials available for this workshop yet.</p>
      ) : (
        <div className="space-y-3">
          {materials.map((material) => (
            <div
              key={material._id}
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-teal-500" />
                <div>
                  <p className="text-gray-200 font-medium">{material.title}</p>
                  <p className="text-sm text-gray-400">{material.fileName}</p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(material._id)}
                className="flex items-center space-x-2 px-3 py-1 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkshopMaterials;