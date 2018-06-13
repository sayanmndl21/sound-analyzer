#from __future__ import print_function
import scipy.io.wavfile as wavf
import numpy as np
import soundfile as sf
import os, sys

#os.chdir('/home/sayan/duke_internship/acoustic_classification') # change to the file directory

for root, dirs, files in os.walk(sys.argv[1]):
	os.mkdir(root+'_wav')
	for file in files:
		if file.endswith('npy'):
			path = os.path.join(root,file)
		#print(file)
			data = np.load(path)
			fs = 44100
			out_f = file[:-4]+'.wav'
			scaled = np.int16(data/np.max(np.abs(data)) * 32767)
			wavf.write(root+'_wav/'+out_f, fs, scaled)
