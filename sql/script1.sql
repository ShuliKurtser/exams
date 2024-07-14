USE [Exams]
GO
/****** Object:  Table [dbo].[DueDates]    Script Date: 03/07/2024 23:10:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DueDates](
	[Id_dueDate] [int] IDENTITY(1,1) NOT NULL,
	[DueDate] [date] NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[Id_exam] [int] NOT NULL,
	[Time] [nchar](10) NOT NULL,
	[Cost] [float] NOT NULL,
	[Status] [bit] NOT NULL,
 CONSTRAINT [PK_DueDates] PRIMARY KEY CLUSTERED 
(
	[Id_dueDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Exams]    Script Date: 03/07/2024 23:10:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Exams](
	[Id_exam] [int] IDENTITY(1,1) NOT NULL,
	[Subjects] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Exams] PRIMARY KEY CLUSTERED 
(
	[Id_exam] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Exams_Users]    Script Date: 03/07/2024 23:10:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Exams_Users](
	[Id_examUser] [int] IDENTITY(1,1) NOT NULL,
	[Id_User] [int] NOT NULL,
	[Id_Exam] [int] NOT NULL,
	[Class] [nvarchar](30) NULL,
	[Grade] [nvarchar](30) NULL,
	[ExamsStatus] [bit] NULL,
	[NotesOffice] [nvarchar](30) NULL,
	[NotesUser] [nvarchar](30) NULL,
	[Id_dueDate] [int] NOT NULL,
 CONSTRAINT [PK_Exams_Users] PRIMARY KEY CLUSTERED 
(
	[Id_examUser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permission]    Script Date: 03/07/2024 23:10:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permission](
	[Id_Permissions] [int] IDENTITY(1,1) NOT NULL,
	[PermissionsName] [nvarchar](30) NOT NULL,
 CONSTRAINT [PK_Permissions] PRIMARY KEY CLUSTERED 
(
	[Id_Permissions] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonalDetailes]    Script Date: 03/07/2024 23:10:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonalDetailes](
	[Id_user] [int] IDENTITY(1,1) NOT NULL,
	[IdentityNum] [nvarchar](50) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[BirthDate] [date] NOT NULL,
	[MaritalStatus] [nvarchar](50) NOT NULL,
	[Gender] [nvarchar](30) NOT NULL,
	[City] [nvarchar](20) NOT NULL,
	[Street] [nvarchar](20) NOT NULL,
	[Number] [int] NOT NULL,
	[HouseNum] [int] NOT NULL,
	[Zip] [int] NOT NULL,
	[Email] [nvarchar](30) NOT NULL,
	[Phone] [nvarchar](20) NOT NULL,
	[FileStudyUrl] [nvarchar](50) NULL,
	[FileTzUrl] [nvarchar](50) NOT NULL,
	[UserPassword] [nvarchar](30) NOT NULL,
	[Permission] [int] NULL,
 CONSTRAINT [PK_PersonalDetailes_1] PRIMARY KEY CLUSTERED 
(
	[Id_user] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RegistrationDates]    Script Date: 03/07/2024 23:10:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RegistrationDates](
	[Id_RegistrationDate] [int] IDENTITY(1,1) NOT NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NOT NULL,
 CONSTRAINT [PK_RegistrationDates] PRIMARY KEY CLUSTERED 
(
	[Id_RegistrationDate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Relief_Users]    Script Date: 03/07/2024 23:10:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Relief_Users](
	[Id_reliefUser] [int] IDENTITY(1,1) NOT NULL,
	[Id_User] [int] NOT NULL,
	[Id_ReliefTypes] [int] NOT NULL,
	[Id_ReliefReasons] [int] NOT NULL,
	[ReliefExplanation] [nvarchar](50) NOT NULL,
	[ReliefStatus] [bit] NULL,
	[Relief_File] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Relief_users] PRIMARY KEY CLUSTERED 
(
	[Id_reliefUser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReliefReasons]    Script Date: 03/07/2024 23:10:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReliefReasons](
	[Id_ReliefReasons] [int] IDENTITY(1,1) NOT NULL,
	[Reasons] [nvarchar](50) NULL,
	[IdRelief] [int] NULL,
 CONSTRAINT [PK_ReliefReasons] PRIMARY KEY CLUSTERED 
(
	[Id_ReliefReasons] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReliefTypes]    Script Date: 03/07/2024 23:10:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReliefTypes](
	[Id_ReliefTypes] [int] IDENTITY(1,1) NOT NULL,
	[ReliefTypes] [nvarchar](30) NOT NULL,
 CONSTRAINT [PK_ReliefTypes] PRIMARY KEY CLUSTERED 
(
	[Id_ReliefTypes] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[DueDates] ON 

INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (1, CAST(N'2024-08-14' AS Date), N'מועד תמוז תשפ"ד', 1, N'11:00     ', 403, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (2, CAST(N'2024-06-18' AS Date), N'מועד אייר תשפ"ד', 1, N'11:30     ', 300, 0)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (3, CAST(N'2024-08-14' AS Date), N'מועד תמוז תשפ"ד', 2, N'10:00     ', 250, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (4, CAST(N'2024-06-20' AS Date), N'מועד אייר תשפ"ד', 2, N'10:30     ', 250, 0)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (5, CAST(N'2024-08-18' AS Date), N'מועד תמוז תשפ"ד', 9, N'10:00     ', 270, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (6, CAST(N'2024-06-15' AS Date), N'מועד אייר תשפ"ד', 9, N'10:30     ', 270, 0)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (7, CAST(N'2024-08-14' AS Date), N'מועד תמוז תשפ"ד', 13, N'10:00     ', 310, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (8, CAST(N'2024-06-18' AS Date), N'מועד אייר תשפ"ד', 13, N'10:30     ', 310, 0)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (9, CAST(N'2024-08-14' AS Date), N'מועד תמוז תשפ"ד', 14, N'10:00     ', 180, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (10, CAST(N'2024-06-15' AS Date), N'מועד אייר תשפ"ד', 14, N'10:30     ', 180, 0)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (11, CAST(N'2024-08-14' AS Date), N'מועד תמוז תשפ"ד', 15, N'10:00     ', 200, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (12, CAST(N'2024-06-15' AS Date), N'מועד אייר תשפ"ד', 15, N'10:30     ', 200, 0)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (13, CAST(N'2024-08-14' AS Date), N'מועד תמוז תשפ"ד', 16, N'10:00     ', 220, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (15, CAST(N'2024-06-18' AS Date), N'מועד אייר תשפ"ד', 16, N'10:30     ', 220, 0)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (16, CAST(N'2024-08-18' AS Date), N'מועד תמוז תשפ"ד', 17, N'10:45     ', 200, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (17, CAST(N'2024-06-20' AS Date), N'מועד אייר תשפ"ד', 17, N'11:00     ', 200, 0)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (18, CAST(N'2024-08-14' AS Date), N'מועד תמוז תשפ"ד', 18, N'10:00     ', 250, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (19, CAST(N'2024-06-15' AS Date), N'מועד אייר תשפ"ד', 18, N'11:11     ', 200, 0)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (20, CAST(N'2024-08-18' AS Date), N'מועד תמוז תשפ"ד', 19, N'10:45     ', 250, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (21, CAST(N'2024-06-15' AS Date), N'מועד אייר תשפ"ד', 19, N'11:00     ', 250, 0)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (24, CAST(N'2024-08-18' AS Date), N'מועד תמוז תשפ"ד', 21, N'10:45     ', 260, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (25, CAST(N'2024-06-20' AS Date), N'מועד אייר תשפ"ד', 21, N'11:00     ', 260, 0)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (26, CAST(N'2024-08-18' AS Date), N'מועד תמוז תשפ"ד', 22, N'10:45     ', 280, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (27, CAST(N'2024-06-15' AS Date), N'מועד אייר תשפ"ד', 22, N'11:00     ', 280, 0)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (28, CAST(N'2024-08-18' AS Date), N'מועד תמוז תשפ"ד', 23, N'10:45     ', 300, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (30, CAST(N'2024-06-20' AS Date), N'מועד אייר תשפ"ד', 23, N'11:00     ', 300, 0)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (31, CAST(N'2024-08-20' AS Date), N'מועד תמוז תשפ"ד', 24, N'10:15     ', 320, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (33, CAST(N'2024-06-18' AS Date), N'מועד אייר תשפ"ד', 24, N'10:30     ', 320, 0)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (34, CAST(N'2024-08-20' AS Date), N'מועד תמוז תשפ"ד', 25, N'10:15     ', 330, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (35, CAST(N'2024-06-18' AS Date), N'מועד אייר תשפ"ד', 25, N'10:30     ', 330, 0)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (36, CAST(N'2024-08-20' AS Date), N'מועד תמוז תשפ"ד', 26, N'10:15     ', 300, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (37, CAST(N'2024-06-18' AS Date), N'מועד אייר תשפ"ד', 26, N'10:30     ', 340, 0)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (38, CAST(N'2024-08-20' AS Date), N'מועד  תמוז תשפ"ד', 27, N'10:15     ', 290, 1)
INSERT [dbo].[DueDates] ([Id_dueDate], [DueDate], [Description], [Id_exam], [Time], [Cost], [Status]) VALUES (39, CAST(N'2024-06-20' AS Date), N'מועד אייר תשפ"ד', 27, N'10:30     ', 290, 0)
SET IDENTITY_INSERT [dbo].[DueDates] OFF
GO
SET IDENTITY_INSERT [dbo].[Exams] ON 

INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (1, N'נידה')
INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (2, N'שמחות')
INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (9, N'חגים')
INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (13, N'מקוואות')
INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (14, N'רבנים צבאיים')
INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (15, N'רבני תפוצות')
INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (16, N'שוב"ים')
INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (17, N'שבת')
INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (18, N'איסור והיתר')
INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (19, N'מילה וגירות')
INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (21, N'עירובין')
INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (22, N'חופה וקידושין')
INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (23, N'רשם נישואין')
INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (24, N'תפילה וברכות')
INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (25, N'משגיחי כשרות')
INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (26, N'מצוות התלויות בארץ')
INSERT [dbo].[Exams] ([Id_exam], [Subjects]) VALUES (27, N'פסח ויו"ט וחול המועד')
SET IDENTITY_INSERT [dbo].[Exams] OFF
GO
SET IDENTITY_INSERT [dbo].[Exams_Users] ON 

INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2580, 1046, 1, N'6', N'97', 1, NULL, NULL, 2)
INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2585, 1047, 25, NULL, NULL, NULL, NULL, NULL, 34)
INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2592, 1041, 2, N'2', N'98', 1, NULL, NULL, 4)
INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2594, 1041, 22, N'3', N'', 1, NULL, NULL, 26)
INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2601, 1, 1, N'1', N'95', 1, NULL, NULL, 2)
INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2602, 1, 17, N'2', N'77', 1, NULL, NULL, 17)
INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2603, 1, 24, N'', N'', NULL, NULL, NULL, 31)
INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2770, 1057, 18, N'3', N'90', 1, NULL, NULL, 19)
INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2771, 1057, 13, N'8', N'89', 1, NULL, NULL, 8)
INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2780, 1058, 23, NULL, NULL, 0, NULL, NULL, 28)
INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2781, 1060, 25, N'6', N'98', 1, NULL, NULL, 35)
INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2789, 1057, 25, NULL, NULL, 0, NULL, NULL, 34)
INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2801, 1062, 18, N'3', N'88', 1, NULL, NULL, 19)
INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2802, 1062, 14, N'4', N'66', 1, NULL, NULL, 10)
INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2803, 1063, 25, N'6', N'97', 1, NULL, NULL, 35)
INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2804, 1063, 21, N'7', N'66', 1, NULL, NULL, 25)
INSERT [dbo].[Exams_Users] ([Id_examUser], [Id_User], [Id_Exam], [Class], [Grade], [ExamsStatus], [NotesOffice], [NotesUser], [Id_dueDate]) VALUES (2805, 1063, 1, N'1', NULL, NULL, NULL, NULL, 2)
SET IDENTITY_INSERT [dbo].[Exams_Users] OFF
GO
SET IDENTITY_INSERT [dbo].[Permission] ON 

INSERT [dbo].[Permission] ([Id_Permissions], [PermissionsName]) VALUES (1, N'נבחן')
INSERT [dbo].[Permission] ([Id_Permissions], [PermissionsName]) VALUES (2, N'עובד')
INSERT [dbo].[Permission] ([Id_Permissions], [PermissionsName]) VALUES (3, N'מנהל')
SET IDENTITY_INSERT [dbo].[Permission] OFF
GO
SET IDENTITY_INSERT [dbo].[PersonalDetailes] ON 

INSERT [dbo].[PersonalDetailes] ([Id_user], [IdentityNum], [FirstName], [LastName], [BirthDate], [MaritalStatus], [Gender], [City], [Street], [Number], [HouseNum], [Zip], [Email], [Phone], [FileStudyUrl], [FileTzUrl], [UserPassword], [Permission]) VALUES (1, N'222222222', N'שאול', N'מושונוב', CAST(N'1980-03-31' AS Date), N'נשואי/ה', N'זכר', N'חיפה', N'הנשיא', 2, 12, 9954345, N'chen.frin@gmail.com', N'0545678789', N'files/study_permit_2d1fefb3.pdf', N'files/study_permit_2d1fefb3.pdf', N'Cc123456', 1)
INSERT [dbo].[PersonalDetailes] ([Id_user], [IdentityNum], [FirstName], [LastName], [BirthDate], [MaritalStatus], [Gender], [City], [Street], [Number], [HouseNum], [Zip], [Email], [Phone], [FileStudyUrl], [FileTzUrl], [UserPassword], [Permission]) VALUES (1018, N'123123123', N'מרדכי', N'מרדכי', CAST(N'2022-11-08' AS Date), N'רווק', N'זכר', N'תל אביב', N'קרליבך', 3, 1, 333333, N'c@gamil.com', N'0523456789', N'Null', N'', N'1212', 2)
INSERT [dbo].[PersonalDetailes] ([Id_user], [IdentityNum], [FirstName], [LastName], [BirthDate], [MaritalStatus], [Gender], [City], [Street], [Number], [HouseNum], [Zip], [Email], [Phone], [FileStudyUrl], [FileTzUrl], [UserPassword], [Permission]) VALUES (1031, N'112233445', N'אסתר', N'סבג', CAST(N'2000-05-05' AS Date), N'רווק/ה', N'נקבה', N'ירושלים', N'יפו', 2, 2, 0, N't@gmail.com', N'0521113333', N'Null', N'', N'Qq123456', 2)
INSERT [dbo].[PersonalDetailes] ([Id_user], [IdentityNum], [FirstName], [LastName], [BirthDate], [MaritalStatus], [Gender], [City], [Street], [Number], [HouseNum], [Zip], [Email], [Phone], [FileStudyUrl], [FileTzUrl], [UserPassword], [Permission]) VALUES (1039, N'987654326', N'יוסי', N'יהודה', CAST(N'2000-02-29' AS Date), N'רווק/ה', N'זכר', N'ירושלים', N'הדס', 2, 34, 0, N'qq@gmail.com', N'0545679087', N'Null', N'', N'Zz123453', 3)
INSERT [dbo].[PersonalDetailes] ([Id_user], [IdentityNum], [FirstName], [LastName], [BirthDate], [MaritalStatus], [Gender], [City], [Street], [Number], [HouseNum], [Zip], [Email], [Phone], [FileStudyUrl], [FileTzUrl], [UserPassword], [Permission]) VALUES (1041, N'333333333', N'מרדכי', N'היהודי', CAST(N'1990-10-30' AS Date), N'נשואי/ה', N'זכר', N'בית שמש', N'נרקיס', 3, 4, 0, N'mmm@gmail.com', N'0545678789', N'files/study_permit_c4c42180.pdf', N'files/id_card_53610673.pdf', N'Zz123488', 1)
INSERT [dbo].[PersonalDetailes] ([Id_user], [IdentityNum], [FirstName], [LastName], [BirthDate], [MaritalStatus], [Gender], [City], [Street], [Number], [HouseNum], [Zip], [Email], [Phone], [FileStudyUrl], [FileTzUrl], [UserPassword], [Permission]) VALUES (1046, N'124454539', N'אברהם', N'אבי', CAST(N'2000-04-04' AS Date), N'רווק/ה', N'זכר', N'ירושלים', N'שלום', 3, 0, 0, N'uuu@gmail.com', N'0545678789', N'files/study_permit_aa9351ba.pdf', N'files/id_card_26b9c176.pdf', N'aA654321', 1)
INSERT [dbo].[PersonalDetailes] ([Id_user], [IdentityNum], [FirstName], [LastName], [BirthDate], [MaritalStatus], [Gender], [City], [Street], [Number], [HouseNum], [Zip], [Email], [Phone], [FileStudyUrl], [FileTzUrl], [UserPassword], [Permission]) VALUES (1047, N'555555555', N'מיכל', N'לוי', CAST(N'2000-09-03' AS Date), N'רווק/ה', N'נקבה', N'חיפה', N'חיפה', 2, 3, 3, N'mm@gmail.com', N'0523456789', N'files/study_permit_9a8c2c7c.pdf', N'files/id_card_0557b9ce.pdf', N'Mm123456', 1)
INSERT [dbo].[PersonalDetailes] ([Id_user], [IdentityNum], [FirstName], [LastName], [BirthDate], [MaritalStatus], [Gender], [City], [Street], [Number], [HouseNum], [Zip], [Email], [Phone], [FileStudyUrl], [FileTzUrl], [UserPassword], [Permission]) VALUES (1057, N'057299190', N'אבנר', N'מנחם', CAST(N'1961-10-03' AS Date), N'נשואי/ה', N'זכר', N'בית שמש', N'חגואל', 19, 99, 111111, N'uchichon2018@gmail.com', N'0508756739', N'files/study_permit_03e3d30f.png', N'files/id_card_daef8f0e.png', N'Am310196', 1)
INSERT [dbo].[PersonalDetailes] ([Id_user], [IdentityNum], [FirstName], [LastName], [BirthDate], [MaritalStatus], [Gender], [City], [Street], [Number], [HouseNum], [Zip], [Email], [Phone], [FileStudyUrl], [FileTzUrl], [UserPassword], [Permission]) VALUES (1058, N'192837465', N'ניסים', N'דהן', CAST(N'1989-10-03' AS Date), N'רווק/ה', N'זכר', N'מודיעין', N'השלושה', 2, 2, 2222, N'n@gmail.com', N'0523456789', N'files/study_permit_0b4d1df9.png', N'files/id_card_8b40f790.png', N'Ni123456', 1)
INSERT [dbo].[PersonalDetailes] ([Id_user], [IdentityNum], [FirstName], [LastName], [BirthDate], [MaritalStatus], [Gender], [City], [Street], [Number], [HouseNum], [Zip], [Email], [Phone], [FileStudyUrl], [FileTzUrl], [UserPassword], [Permission]) VALUES (1060, N'021383435', N'מרים', N'חדד', CAST(N'1980-01-03' AS Date), N'נשואי/ה', N'נקבה', N'ירושלים', N'הראובני', 20, 40, 444444, N'mrymhdd0@gmail.com', N'0504118232', N'files/study_permit_4d0e6058.png', N'files/id_card_225ef629.png', N'Mm123456', 1)
INSERT [dbo].[PersonalDetailes] ([Id_user], [IdentityNum], [FirstName], [LastName], [BirthDate], [MaritalStatus], [Gender], [City], [Street], [Number], [HouseNum], [Zip], [Email], [Phone], [FileStudyUrl], [FileTzUrl], [UserPassword], [Permission]) VALUES (1062, N'777777777', N'יוחנן', N'יחננוב', CAST(N'2000-10-01' AS Date), N'נשואי/ה', N'זכר', N'חיפה', N'שלום', 2, 2, 2, N'Yy@gmail.com', N'1234566789', N'files/study_permit_ffaf456e.png', N'files/id_card_a5438f0f.png', N'P123456p', 1)
INSERT [dbo].[PersonalDetailes] ([Id_user], [IdentityNum], [FirstName], [LastName], [BirthDate], [MaritalStatus], [Gender], [City], [Street], [Number], [HouseNum], [Zip], [Email], [Phone], [FileStudyUrl], [FileTzUrl], [UserPassword], [Permission]) VALUES (1063, N'057299182', N'שמעון', N'משיח', CAST(N'1957-04-01' AS Date), N'רווק/ה', N'זכר', N'פתח תקוה', N'שלום אש', 11, 1, 1111111, N'Shimon1059@gmail.com', N'0503371195', N'files/study_permit_0135132c.png', N'files/id_card_7990e30b.png', N'Sm195708', 1)
SET IDENTITY_INSERT [dbo].[PersonalDetailes] OFF
GO
SET IDENTITY_INSERT [dbo].[RegistrationDates] ON 

INSERT [dbo].[RegistrationDates] ([Id_RegistrationDate], [StartDate], [EndDate]) VALUES (1, CAST(N'2024-06-14' AS Date), CAST(N'2024-07-31' AS Date))
SET IDENTITY_INSERT [dbo].[RegistrationDates] OFF
GO
SET IDENTITY_INSERT [dbo].[Relief_Users] ON 

INSERT [dbo].[Relief_Users] ([Id_reliefUser], [Id_User], [Id_ReliefTypes], [Id_ReliefReasons], [ReliefExplanation], [ReliefStatus], [Relief_File]) VALUES (33, 1018, 2, 2, N'', 0, N'')
INSERT [dbo].[Relief_Users] ([Id_reliefUser], [Id_User], [Id_ReliefTypes], [Id_ReliefReasons], [ReliefExplanation], [ReliefStatus], [Relief_File]) VALUES (34, 1018, 4, 3, N'', 0, N'')
INSERT [dbo].[Relief_Users] ([Id_reliefUser], [Id_User], [Id_ReliefTypes], [Id_ReliefReasons], [ReliefExplanation], [ReliefStatus], [Relief_File]) VALUES (37, 1018, 2, 2, N'', 0, N'')
INSERT [dbo].[Relief_Users] ([Id_reliefUser], [Id_User], [Id_ReliefTypes], [Id_ReliefReasons], [ReliefExplanation], [ReliefStatus], [Relief_File]) VALUES (39, 1018, 3, 3, N'', 0, N'')
INSERT [dbo].[Relief_Users] ([Id_reliefUser], [Id_User], [Id_ReliefTypes], [Id_ReliefReasons], [ReliefExplanation], [ReliefStatus], [Relief_File]) VALUES (40, 1018, 3, 3, N'', 0, N'')
INSERT [dbo].[Relief_Users] ([Id_reliefUser], [Id_User], [Id_ReliefTypes], [Id_ReliefReasons], [ReliefExplanation], [ReliefStatus], [Relief_File]) VALUES (90, 1047, 2, 1, N'', 0, N'files/2-3.pdf_6b27e919.pdf')
INSERT [dbo].[Relief_Users] ([Id_reliefUser], [Id_User], [Id_ReliefTypes], [Id_ReliefReasons], [ReliefExplanation], [ReliefStatus], [Relief_File]) VALUES (102, 1, 1, 1, N'', 1, N'files/ספר פרויקט ציפי גולדברג.pdf_d8a08fd9.pdf')
INSERT [dbo].[Relief_Users] ([Id_reliefUser], [Id_User], [Id_ReliefTypes], [Id_ReliefReasons], [ReliefExplanation], [ReliefStatus], [Relief_File]) VALUES (138, 1057, 5, 3, N'', 0, N'files/relief_File_278d4b6e.png')
INSERT [dbo].[Relief_Users] ([Id_reliefUser], [Id_User], [Id_ReliefTypes], [Id_ReliefReasons], [ReliefExplanation], [ReliefStatus], [Relief_File]) VALUES (140, 1, 2, 2, N'', NULL, N'files/relief_File_a1f9a0e1.png')
INSERT [dbo].[Relief_Users] ([Id_reliefUser], [Id_User], [Id_ReliefTypes], [Id_ReliefReasons], [ReliefExplanation], [ReliefStatus], [Relief_File]) VALUES (144, 1058, 1, 1, N'', 1, N'files/relief_File_15ead1f7.png')
INSERT [dbo].[Relief_Users] ([Id_reliefUser], [Id_User], [Id_ReliefTypes], [Id_ReliefReasons], [ReliefExplanation], [ReliefStatus], [Relief_File]) VALUES (145, 1058, 3, 3, N'', 0, N'files/relief_File_15ead1f7.png')
INSERT [dbo].[Relief_Users] ([Id_reliefUser], [Id_User], [Id_ReliefTypes], [Id_ReliefReasons], [ReliefExplanation], [ReliefStatus], [Relief_File]) VALUES (146, 1060, 1, 6, N'', 0, N'files/relief_File_8d90f8a3.png')
INSERT [dbo].[Relief_Users] ([Id_reliefUser], [Id_User], [Id_ReliefTypes], [Id_ReliefReasons], [ReliefExplanation], [ReliefStatus], [Relief_File]) VALUES (152, 1062, 1, 1, N'', NULL, N'files/relief_File_62278484.png')
INSERT [dbo].[Relief_Users] ([Id_reliefUser], [Id_User], [Id_ReliefTypes], [Id_ReliefReasons], [ReliefExplanation], [ReliefStatus], [Relief_File]) VALUES (154, 1063, 5, 2, N'', 1, N'files/relief_File_1abad260.jpeg')
INSERT [dbo].[Relief_Users] ([Id_reliefUser], [Id_User], [Id_ReliefTypes], [Id_ReliefReasons], [ReliefExplanation], [ReliefStatus], [Relief_File]) VALUES (155, 1063, 4, 5, N'', NULL, N'files/relief_File_f17d4c37.png')
SET IDENTITY_INSERT [dbo].[Relief_Users] OFF
GO
SET IDENTITY_INSERT [dbo].[ReliefReasons] ON 

INSERT [dbo].[ReliefReasons] ([Id_ReliefReasons], [Reasons], [IdRelief]) VALUES (1, N'לקויות למידה', 8)
INSERT [dbo].[ReliefReasons] ([Id_ReliefReasons], [Reasons], [IdRelief]) VALUES (2, N'בעיה רפואית קבוע', 2)
INSERT [dbo].[ReliefReasons] ([Id_ReliefReasons], [Reasons], [IdRelief]) VALUES (3, N'בעיה רפואית זמנית', 3)
INSERT [dbo].[ReliefReasons] ([Id_ReliefReasons], [Reasons], [IdRelief]) VALUES (4, N'הפרעות קשב וריכוז', 4)
INSERT [dbo].[ReliefReasons] ([Id_ReliefReasons], [Reasons], [IdRelief]) VALUES (5, N'קשיים בשפה העברית', 5)
INSERT [dbo].[ReliefReasons] ([Id_ReliefReasons], [Reasons], [IdRelief]) VALUES (6, N'נבחן מעל גיל 50', 6)
SET IDENTITY_INSERT [dbo].[ReliefReasons] OFF
GO
SET IDENTITY_INSERT [dbo].[ReliefTypes] ON 

INSERT [dbo].[ReliefTypes] ([Id_ReliefTypes], [ReliefTypes]) VALUES (1, N'הארכת זמן')
INSERT [dbo].[ReliefTypes] ([Id_ReliefTypes], [ReliefTypes]) VALUES (2, N'שכתוב')
INSERT [dbo].[ReliefTypes] ([Id_ReliefTypes], [ReliefTypes]) VALUES (3, N'הקלדה')
INSERT [dbo].[ReliefTypes] ([Id_ReliefTypes], [ReliefTypes]) VALUES (4, N'שימוש במילון')
INSERT [dbo].[ReliefTypes] ([Id_ReliefTypes], [ReliefTypes]) VALUES (5, N'יציאה לשרותים ללא הגבלה')
INSERT [dbo].[ReliefTypes] ([Id_ReliefTypes], [ReliefTypes]) VALUES (6, N'הקראת שאלון הבחינה')
INSERT [dbo].[ReliefTypes] ([Id_ReliefTypes], [ReliefTypes]) VALUES (7, N'אחר')
SET IDENTITY_INSERT [dbo].[ReliefTypes] OFF
GO
ALTER TABLE [dbo].[Exams_Users] ADD  CONSTRAINT [DF_Exams_Users_ExamsStatus]  DEFAULT (NULL) FOR [ExamsStatus]
GO
ALTER TABLE [dbo].[Relief_Users] ADD  CONSTRAINT [DF_Relief_Users_ReliefStatus]  DEFAULT (NULL) FOR [ReliefStatus]
GO
ALTER TABLE [dbo].[DueDates]  WITH CHECK ADD  CONSTRAINT [FK_DueDates_Exams] FOREIGN KEY([Id_exam])
REFERENCES [dbo].[Exams] ([Id_exam])
GO
ALTER TABLE [dbo].[DueDates] CHECK CONSTRAINT [FK_DueDates_Exams]
GO
ALTER TABLE [dbo].[Exams_Users]  WITH CHECK ADD  CONSTRAINT [FK_Exams_Users_DueDates] FOREIGN KEY([Id_dueDate])
REFERENCES [dbo].[DueDates] ([Id_dueDate])
GO
ALTER TABLE [dbo].[Exams_Users] CHECK CONSTRAINT [FK_Exams_Users_DueDates]
GO
ALTER TABLE [dbo].[Exams_Users]  WITH CHECK ADD  CONSTRAINT [FK_Exams_Users_Exams] FOREIGN KEY([Id_Exam])
REFERENCES [dbo].[Exams] ([Id_exam])
GO
ALTER TABLE [dbo].[Exams_Users] CHECK CONSTRAINT [FK_Exams_Users_Exams]
GO
ALTER TABLE [dbo].[Exams_Users]  WITH CHECK ADD  CONSTRAINT [FK_Exams_Users_Exams_Users] FOREIGN KEY([Id_examUser])
REFERENCES [dbo].[Exams_Users] ([Id_examUser])
GO
ALTER TABLE [dbo].[Exams_Users] CHECK CONSTRAINT [FK_Exams_Users_Exams_Users]
GO
ALTER TABLE [dbo].[Exams_Users]  WITH CHECK ADD  CONSTRAINT [FK_Exams_Users_PersonalDetailes] FOREIGN KEY([Id_User])
REFERENCES [dbo].[PersonalDetailes] ([Id_user])
GO
ALTER TABLE [dbo].[Exams_Users] CHECK CONSTRAINT [FK_Exams_Users_PersonalDetailes]
GO
ALTER TABLE [dbo].[PersonalDetailes]  WITH CHECK ADD  CONSTRAINT [FK_PersonalDetailes_Permission] FOREIGN KEY([Permission])
REFERENCES [dbo].[Permission] ([Id_Permissions])
GO
ALTER TABLE [dbo].[PersonalDetailes] CHECK CONSTRAINT [FK_PersonalDetailes_Permission]
GO
ALTER TABLE [dbo].[Relief_Users]  WITH CHECK ADD  CONSTRAINT [FK__Relief_Us__Id_Re__34C8D9D1] FOREIGN KEY([Id_ReliefTypes])
REFERENCES [dbo].[ReliefTypes] ([Id_ReliefTypes])
GO
ALTER TABLE [dbo].[Relief_Users] CHECK CONSTRAINT [FK__Relief_Us__Id_Re__34C8D9D1]
GO
ALTER TABLE [dbo].[Relief_Users]  WITH CHECK ADD  CONSTRAINT [FK__Relief_Us__Id_Re__35BCFE0A] FOREIGN KEY([Id_ReliefReasons])
REFERENCES [dbo].[ReliefReasons] ([Id_ReliefReasons])
GO
ALTER TABLE [dbo].[Relief_Users] CHECK CONSTRAINT [FK__Relief_Us__Id_Re__35BCFE0A]
GO
ALTER TABLE [dbo].[Relief_Users]  WITH CHECK ADD FOREIGN KEY([Id_User])
REFERENCES [dbo].[PersonalDetailes] ([Id_user])
GO
