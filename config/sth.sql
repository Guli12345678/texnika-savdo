-- Active: 1745317238592@@127.0.0.1@3306@texnika-savdo
SELECT U.full_name, Ct.start_time,Ct.end_time FROM users U
LEFT JOIN contract Ct ON Ct.userId=U.id
LEFT JOIN machine Mne ON Mne.userId=U.id
BETWEEN Ct.start_time AND Ct.end_time