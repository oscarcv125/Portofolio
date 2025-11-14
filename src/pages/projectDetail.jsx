import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/projectDetail.css";

const ProjectDetail = () => {
	const { id } = useParams();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const project = INFO.projects.find((p) => p.id === id);

	if (!project) {
		return <Navigate to="/404" />;
	}

	const currentSEO = SEO.find((item) => item.page === "projects");

	// Project-specific data
	const projectData = {
		gategenie: {
			overview: `GateGenie is an AI-powered airline catering intelligence platform developed for HackMTY 2025.
			The application tackles a $164M industry problem by optimizing inventory management, predicting consumption patterns,
			and maximizing workforce productivity in airline catering operations.`,
			features: [
				"AI-powered expiration tracking with Gemini Vision API for scanning product labels",
				"Real-time consumption prediction analytics for flight-by-flight analysis",
				"Workforce productivity optimization with drawer assembly time estimation",
				"Smart flight assignment system integrating all modules for waste reduction",
				"Interactive data visualization using Swift Charts framework",
			],
			tech: ["Swift 5.9", "SwiftUI", "Gemini 1.5 Flash API", "Swift Charts", "MVVM Architecture", "AVFoundation"],
			codeSnippets: [
				{
					title: "Gemini Vision API - Product Label Scanner",
					language: "swift",
					code: `class GeminiAPI {
    static let shared = GeminiAPI()

    private let apiKey = "key"
    private let visionEndpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

    func scanProductLabel(_ image: UIImage) async throws -> ProductScanResult {
        let prompt = """
        Analyze this product label image and extract the following information:
        - Product Name
        - Product ID (if visible)
        - Expiry Date (format: YYYY-MM-DD)
        - LOT Number
        - Quantity
        - Weight or Volume

        Return the information in JSON format with keys: productName, productID, expiryDate, lotNumber, quantity, weightOrVolume
        If any field is not visible, use "Unknown" for text fields or "0" for numeric fields.
        """

        let base64Image = image.jpegData(compressionQuality: 0.8)?.base64EncodedString() ?? ""

        let requestBody: [String: Any] = [
            "contents": [
                [
                    "parts": [
                        ["text": prompt],
                        [
                            "inline_data": [
                                "mime_type": "image/jpeg",
                                "data": base64Image
                            ]
                        ]
                    ]
                ]
            ]
        ]

        let url = URL(string: "\\(visionEndpoint)?key=\\(apiKey)")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try JSONSerialization.data(withJSONObject: requestBody)

        let (data, response) = try await URLSession.shared.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse,
              httpResponse.statusCode == 200 else {
            throw GeminiError.apiError("Failed to scan image")
        }

        let result = try JSONDecoder().decode(GeminiResponse.self, from: data)

        guard let text = result.candidates.first?.content.parts.first?.text else {
            throw GeminiError.invalidResponse
        }

        return try parseProductScanResult(from: text)
    }
}`,
				},
				{
					title: "Expiry Tracking ViewModel",
					language: "swift",
					code: `@MainActor
class ExpiryViewModel: ObservableObject {
    @Published var products: [Product] = []
    @Published var loading = false
    @Published var error: String?
    @Published var lastUpdated: Date?

    private let dataService = DataService.shared

    func loadData() async {
        loading = true
        error = nil

        do {
            products = try await dataService.loadExpirationData()
            lastUpdated = Date()
            loading = false
        } catch {
            self.error = error.localizedDescription
            loading = false
        }
    }

    var criticalItems: [Product] {
        products.filter { $0.daysUntilExpiry == 0 }
    }

    var warningItems: [Product] {
        products.filter { $0.daysUntilExpiry > 0 && $0.daysUntilExpiry <= 7 }
    }

    var sortedByExpiry: [Product] {
        products.sorted { $0.daysUntilExpiry < $1.daysUntilExpiry }
    }

    var wasteStats: WasteStats {
        WasteStats(
            totalProducts: products.count,
            criticalCount: criticalItems.count,
            warningCount: warningItems.count,
            criticalUnits: criticalItems.reduce(0) { $0 + $1.quantity },
            warningUnits: warningItems.reduce(0) { $0 + $1.quantity },
            estimatedCriticalValue: criticalItems.reduce(0) { $0 + (Double($1.quantity) * 0.5) }
        )
    }
}`,
				},
			],
			images: [
				"https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=GateGenie+Dashboard",
				"https://via.placeholder.com/800x600/10B981/FFFFFF?text=Expiration+Tracking",
				"https://via.placeholder.com/800x600/8B5CF6/FFFFFF?text=AI+Scanner",
				"https://via.placeholder.com/800x600/F59E0B/FFFFFF?text=Analytics+Charts",
			],
			videos: ["https://www.youtube.com/embed/0LKZbznRNo0"],
		},
		helpdoku: {
			overview: `HelpDoku is an intelligent Sudoku puzzle assistant powered by Apple Intelligence and built with SwiftUI.
			The app leverages the Foundation Models API (LanguageModelSession) to provide AI-generated strategic hints that help users solve Sudoku puzzles.
			With real-time validation, intelligent cell highlighting, and adaptive layouts for both iPhone and iPad, HelpDoku demonstrates advanced integration
			of on-device AI capabilities with a polished user experience.`,
			features: [
				"Apple Intelligence integration using Foundation Models API for context-aware hints",
				"Interactive Sudoku board with cell selection and real-time validation",
				"AI-powered hint generation with natural language explanations",
				"Smart cell highlighting to guide users to suggested moves",
				"Adaptive layouts optimized for both iPhone and iPad",
				"Real-time puzzle validation and completion detection",
				"SwiftUI-based modern interface with custom grid rendering",
				"Error highlighting for invalid moves",
			],
			tech: ["Swift", "SwiftUI", "Foundation Models", "Apple Intelligence", "LanguageModelSession", "Combine", "iOS 18.1+"],
			codeSnippets: [
				{
					title: "Apple Intelligence Integration",
					language: "swift",
					code: `import FoundationModels

@MainActor
class SudokuAIHelper: ObservableObject {
    @Published var currentHint: String = ""
    @Published var isGenerating: Bool = false
    private var model: SystemLanguageModel?

    init() {
        if #available(iOS 18.1, macOS 15.1, *) {
            self.model = SystemLanguageModel.default
        }
    }

    func generateHint(for game: SudokuGame) async {
        isGenerating = true
        currentHint = ""
        game.hintedCell = nil

        if #available(iOS 18.1, macOS 15.1, *), let model = model {
            switch model.availability {
            case .available:
                do {
                    let hint = try await generateWithAppleIntelligence(for: game)
                    currentHint = hint
                    parseAndHighlightHint(hint, game: game)
                } catch {
                    currentHint = "Error: Unable to generate AI hint."
                }
            case .unavailable(.appleIntelligenceNotEnabled):
                currentHint = "Apple Intelligence is not enabled."
            case .unavailable(.modelNotReady):
                currentHint = "AI model is downloading. Please try again."
            default:
                currentHint = "Apple Intelligence unavailable."
            }
        }
        isGenerating = false
    }
}`,
				},
				{
					title: "Foundation Model Session",
					language: "swift",
					code: `@available(iOS 18.1, macOS 15.1, *)
private func generateWithAppleIntelligence(for game: SudokuGame) async throws -> String {
    let boardState = game.getBoardAsString()

    let instructions = """
    You are a Sudoku expert assistant. Your role is to help players by providing ONE specific, \\
    actionable hint for the next move. Always respond with exactly this format:

    Hint: Put [number] in row [X], column [Y]
    Reason: [Brief explanation in one sentence]

    Keep your response concise (under 50 words). Focus on finding the easiest next move where \\
    a number can be deduced with certainty.
    """

    let session = LanguageModelSession(instructions: instructions)

    let prompt = """
    Analyze this Sudoku board and provide ONE helpful hint for the next move:

    \\(boardState)

    Find a cell where you can deduce the number with certainty based on Sudoku rules \\
    (checking rows, columns, and 3x3 boxes). Provide the hint in the specified format.
    """

    let options = GenerationOptions(temperature: 0.3)
    let response = try await session.respond(to: prompt, options: options)
    return response.content
}`,
				},
				{
					title: "Interactive Sudoku Board View",
					language: "swift",
					code: `struct SudokuBoardView: View {
    @ObservedObject var game: SudokuGame

    var body: some View {
        VStack(spacing: 0) {
            ForEach(0..<9, id: \\.self) { row in
                HStack(spacing: 0) {
                    ForEach(0..<9, id: \\.self) { col in
                        SudokuCellView(
                            value: game.board[row][col],
                            isInitial: game.isInitialCell(row: row, col: col),
                            isSelected: game.selectedCell?.row == row && game.selectedCell?.col == col,
                            isHinted: game.hintedCell?.row == row && game.hintedCell?.col == col,
                            isValid: game.board[row][col] == 0 || game.isValid(row: row, col: col, num: game.board[row][col])
                        )
                        .onTapGesture {
                            game.selectedCell = (row, col)
                        }
                        .border(width: col % 3 == 2 && col != 8 ? 2 : 0.5, edges: [.trailing], color: .black)
                    }
                }
                .border(width: row % 3 == 2 && row != 8 ? 2 : 0.5, edges: [.bottom], color: .black)
            }
        }
        .border(width: 2, edges: [.top, .leading], color: .black)
        .aspectRatio(1, contentMode: .fit)
    }
}`,
				},
				{
					title: "Real-time Validation Logic",
					language: "swift",
					code: `func isValid(row: Int, col: Int, num: Int) -> Bool {
    // Check row
    for i in 0..<9 {
        if i != col && board[row][i] == num {
            return false
        }
    }

    // Check column
    for i in 0..<9 {
        if i != row && board[i][col] == num {
            return false
        }
    }

    // Check 3x3 box
    let boxRow = (row / 3) * 3
    let boxCol = (col / 3) * 3
    for i in boxRow..<boxRow + 3 {
        for j in boxCol..<boxCol + 3 {
            if (i != row || j != col) && board[i][j] == num {
                return false
            }
        }
    }

    return true
}

func isSolved() -> Bool {
    for row in 0..<9 {
        for col in 0..<9 {
            if board[row][col] == 0 || !isValid(row: row, col: col, num: board[row][col]) {
                return false
            }
        }
    }
    return true
}`,
				},
			],
			images: [
				"https://via.placeholder.com/800x600/7C3AED/FFFFFF?text=HelpDoku+Board",
				"https://via.placeholder.com/800x600/8B5CF6/FFFFFF?text=AI+Hints",
				"https://via.placeholder.com/800x600/A78BFA/FFFFFF?text=iPad+Layout",
				"https://via.placeholder.com/800x600/C4B5FD/FFFFFF?text=Validation",
			],
			videos: ["https://www.youtube.com/embed/DYGyn__TXXk"],
		},
		heatshield: {
			overview: `HeatShield is an iOS safety application protecting users during extreme heat events.
			Built with SwiftUI and integrating OpenWeatherMap API for real-time weather data, the app provides heat alerts,
			cool zone locators, and comprehensive safety features. Won 1st place at Swift Challenge Fest for innovation and impact.`,
			features: [
				"Real-time heat alerts with customizable temperature thresholds",
				"Smart notification system for sunscreen and hydration reminders",
				"Location-based cool zone finder with Apple Maps integration",
				"Heat index calculation with 5 safety levels",
				"Weather forecasting with UV index and air quality monitoring",
				"OpenWeatherMap API integration for accurate weather data",
			],
			tech: ["Swift", "SwiftUI", "OpenWeatherMap API", "Core Location", "UserNotifications", "MapKit"],
			codeSnippets: [
				{
					title: "Weather Manager with OpenWeatherMap API",
					language: "swift",
					code: `class WeatherManager: ObservableObject {
    @Published var currentWeather: WeatherData?
    @Published var dailyForecast: [DailyForecast] = []
    @Published var isLoading = false

    private let apiKey = "key"

    func fetchWeather(for location: CLLocation) {
        isLoading = true
        errorMessage = nil

        let lat = location.coordinate.latitude
        let lon = location.coordinate.longitude
        let urlString = "https://api.openweathermap.org/data/2.5/weather?lat=\\(lat)&lon=\\(lon)&appid=\\(apiKey)&units=metric"

        guard let url = URL(string: urlString) else { return }

        URLSession.shared.dataTask(with: url) { data, response, error in
            DispatchQueue.main.async {
                self.isLoading = false

                guard let data = data else { return }

                do {
                    let weatherResponse = try JSONDecoder().decode(WeatherResponse.self, from: data)
                    self.currentWeather = WeatherData(from: weatherResponse)
                } catch {
                    print("Error: \\(error)")
                }
            }
        }.resume()
    }

    func getWeatherMetrics() -> WeatherMetrics? {
        guard let weather = currentWeather else { return nil }

        return WeatherMetrics(
            temperature: weather.temperature,
            humidity: weather.humidity,
            uvIndex: weather.uvIndex,
            windSpeed: weather.windSpeed,
            heatIndex: weather.heatIndex,
            airQuality: generateAirQuality(for: weather.temperature),
            visibility: generateVisibility(for: weather.humidity)
        )
    }
}`,
				},
				{
					title: "Notification Manager - Heat Alerts",
					language: "swift",
					code: `class NotificationManager: ObservableObject {
    @Published var isAuthorized = false
    @Published var sunscreenRemindersEnabled = true
    @Published var hydrationRemindersEnabled = true
    @Published var sunscreenInterval: Double = 2.0 // hours
    @Published var hydrationInterval: Double = 2.0 // hours

    func requestPermission() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .badge, .sound]) { granted, error in
            DispatchQueue.main.async {
                self.isAuthorized = granted
                if granted {
                    self.setupReminders()
                }
            }
        }
    }

    func scheduleHeatAlert(temperature: Int, threshold: Double) {
        guard isAuthorized, Double(temperature) >= threshold else { return }

        let content = UNMutableNotificationContent()
        content.title = "⚠️ Extreme Heat Alert"
        content.body = "Temperature: \\(temperature)°C. Seek shelter immediately."
        content.sound = UNNotificationSound.default
        content.categoryIdentifier = "HEAT_ALERT"

        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 1, repeats: false)
        let request = UNNotificationRequest(
            identifier: "heat_alert_\\(UUID().uuidString)",
            content: content,
            trigger: trigger
        )

        UNUserNotificationCenter.current().add(request)
    }

    private func scheduleSunscreenReminder() {
        let content = UNMutableNotificationContent()
        content.title = "☀️ Sun Protection"
        content.body = "Time to reapply sunscreen. Protect your skin."
        content.sound = UNNotificationSound.default

        let trigger = UNTimeIntervalNotificationTrigger(
            timeInterval: sunscreenInterval * 3600,
            repeats: true
        )

        let request = UNNotificationRequest(
            identifier: "sunscreen_reminder",
            content: content,
            trigger: trigger
        )

        UNUserNotificationCenter.current().add(request)
    }
}`,
				},
			],
			images: [
				"/Heatshield1.png",
				"/Heatshield2.png",
				"/Heatshield3.png",
				"/Heatshield4.png",
				"/Heashield7.png",
				"/Heashield 8.png",
			],
			videos: ["/HEATSHIELDVIDEO.mov"],
		},
		wuno: {
			overview: `WUNO is a FIFA World Cup 2026 companion app built with SwiftUI and powered by Apple's Foundation Models.
			The application provides comprehensive tournament information, match tracking, and AI-powered insights using on-device intelligence.
			It features App Shortcuts integration for Siri commands and supports all World Cup 2026 matches across USA, Canada, and Mexico.`,
			features: [
				"Complete World Cup 2026 match schedule and tracking",
				"AI-powered match insights using Foundation Models (iOS 26+)",
				"Structured output generation for match recommendations",
				"App Shortcuts integration for Siri voice commands",
				"Real-time match updates and smart notifications",
				"Venue information for stadiums across North America",
				"Personalized schedule recommendations based on preferences",
			],
			tech: ["Swift", "SwiftUI", "Foundation Models", "App Intents", "Core Location", "App Shortcuts", "Combine"],
			codeSnippets: [
				{
					title: "Match Data Model",
					language: "swift",
					code: `struct SimpleMatch: Identifiable, Codable, Hashable {
    let id: String
    var homeTeam: String
    var awayTeam: String
    var date: Date
    var stadium: String
    var city: String
    var phase: MatchPhase
    var status: MatchStatus
    var score: MatchScore?
    var importance: SimpleMatchImportance

    var teamsDisplayName: String {
        "\\(homeTeam) vs \\(awayTeam)"
    }

    var isToday: Bool {
        Calendar.current.isDateInToday(date)
    }

    var isLive: Bool {
        status == .live
    }

    var formattedDate: String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .short
        return formatter.string(from: date)
    }

    // AI-friendly description for voice interactions
    var voiceDescription: String {
        let timeDescription = isToday ? "today" : formattedDate
        let statusDescription = isLive ? "currently playing" : "scheduled"
        return "\\(teamsDisplayName) in \\(city), \\(timeDescription), \\(statusDescription)"
    }

    var searchKeywords: [String] {
        var keywords = [homeTeam, awayTeam, city, stadium, phase.rawValue]
        if isToday { keywords.append("today") }
        if isLive { keywords.append("live") }
        return keywords.map { $0.lowercased() }
    }
}`,
				},
				{
					title: "Foundation Models Manager",
					language: "swift",
					code: `@MainActor
class FoundationModelManager: ObservableObject {
    static let shared = FoundationModelManager()

    @Published var modelAvailability: ModelAvailability = .checking
    @Published var isProcessing = false

    private var model: SystemLanguageModel?
    private var currentSession: LanguageModelSession?

    private func checkModelAvailability() {
        guard #available(iOS 26.0, *) else {
            modelAvailability = .unavailable(reason: "Requires iOS 26.0 or later")
            return
        }

        model = SystemLanguageModel.default

        guard let model = model else {
            modelAvailability = .unavailable(reason: "Model not found")
            return
        }

        switch model.availability {
        case .available:
            modelAvailability = .available
        case .unavailable(.appleIntelligenceNotEnabled):
            modelAvailability = .unavailable(reason: "Enable Apple Intelligence in Settings")
        case .unavailable(.modelNotReady):
            modelAvailability = .unavailable(reason: "Model downloading")
        default:
            modelAvailability = .unavailable(reason: "Model unavailable")
        }
    }

    func generateMatchInsights(for match: Match) async throws -> WorldCupInsights {
        guard case .available = modelAvailability else {
            throw ModelError.modelNotLoaded
        }

        isProcessing = true
        defer { isProcessing = false }

        let instructions = """
        You are a World Cup 2026 assistant. Provide:
        1. Match prediction (max 30 words)
        2. Tactical analysis (max 40 words)
        3. Historical context (max 30 words)
        4. Why watch this match (max 25 words)
        """

        let session = LanguageModelSession(instructions: instructions)

        let prompt = """
        Match: \\(match.teams.joined(separator: " vs "))
        Venue: \\(match.venueName), \\(match.venueCity)
        Date: \\(match.date.formatted())
        """

        let response = try await session.respond(
            to: prompt,
            generating: MatchInsightResponse.self
        )

        return WorldCupInsights(
            matchPrediction: response.content.prediction,
            keyPlayersToWatch: response.content.keyPlayers,
            tacticalAnalysis: response.content.tacticalAnalysis,
            historicalContext: response.content.historicalContext,
            confidenceLevel: response.content.confidence,
            recommendationReason: response.content.reason
        )
    }
}

@Generable
struct MatchInsightResponse: Equatable {
    let prediction: String
    let keyPlayers: [String]
    let tacticalAnalysis: String
    let historicalContext: String
    let confidence: Double
    let reason: String
}`,
				},
			],
			images: [
				"/WUNO1.png",
				"/WUNO2.png",
				"/WUNO3.png",
			],
			videos: ["/WUNOVID.mov"],
		},
		kaapeh: {
			overview: `Kaapeh Mexico is an innovative iOS mobile application for coffee traceability using Blockchain technology.
			Developed in collaboration with a global team, this app ensures product quality and transparency throughout the coffee supply chain.
			By implementing blockchain-based tracking, Kaapeh allows consumers and producers to verify the authenticity and journey of their coffee from farm to cup.`,
			features: [
				"Blockchain-based coffee traceability for complete supply chain visibility",
				"SwiftData for efficient local data persistence",
				"Real-time quality metrics and certification tracking",
				"Global team collaboration with international coffee producers",
				"Transparent supply chain verification for consumers",
				"Secure cryptographic hashing for data integrity",
			],
			tech: ["Swift", "SwiftUI", "SwiftData", "Blockchain", "CryptoKit", "REST APIs"],
			images: [
				"/Kaffi1.png",
				"/Kaffi2.png",
				"/Kaffi3.png",
				"/Kaffi4.png",
				"/Kaffi5.png",
			],
			videos: ["https://www.youtube.com/embed/_kFvWmLoLKA"],
			qrCode: "/QRKaffi.png",
		},
		semex: {
			overview: `Semex Traffic Simulation is an intelligent traffic light system developed in collaboration with Semex (Semáforos Mexicanos).
			This project utilizes agent-based modeling in Python with AgentPy to simulate autonomous car agents and optimize traffic light coordination.
			The simulation achieved a 35% improvement in traffic flow through smart phase management and real-time coordination.
			A Unity visualization client was integrated for real-time testing and visualization of the traffic system.`,
			features: [
				"Agent-based traffic simulation with autonomous car behavior",
				"Socket communication for real-time Unity integration",
				"Multi-phase traffic light coordination system",
				"Protected left-turn phases and intelligent signal timing",
				"35% improvement in simulated traffic flow efficiency",
				"Support for complex intersection patterns including diagonal lanes",
			],
			tech: ["Python", "AgentPy", "Socket Programming", "Unity", "C#", "Agent-Based Modeling", "Real-time Systems"],
			codeSnippets: [
				{
					title: "Unity Traffic Client - Real-time Socket Communication",
					language: "csharp",
					code: `using System;
using System.Net.Sockets;
using System.Text;
using UnityEngine;

public class TrafficClient : MonoBehaviour
{
    private TcpClient client;
    private NetworkStream stream;
    private byte[] buffer = new byte[4096];

    void Start()
    {
        ConnectToServer("127.0.0.1", 5555);
    }

    void ConnectToServer(string host, int port)
    {
        try
        {
            client = new TcpClient(host, port);
            stream = client.GetStream();
            Debug.Log($"Connected to Python server at {host}:{port}");
            stream.BeginRead(buffer, 0, buffer.Length, OnDataReceived, null);
        }
        catch (Exception e)
        {
            Debug.LogError($"Connection failed: {e.Message}");
        }
    }

    void OnDataReceived(IAsyncResult ar)
    {
        int bytesRead = stream.EndRead(ar);
        if (bytesRead > 0)
        {
            string json = Encoding.UTF8.GetString(buffer, 0, bytesRead);
            UpdateCars(json);
            stream.BeginRead(buffer, 0, buffer.Length, OnDataReceived, null);
        }
    }

    void UpdateCars(string jsonData)
    {
        // Parse JSON and update car positions in Unity scene
        var state = JsonUtility.FromJson<TrafficState>(jsonData);
        foreach (var carData in state.cars)
        {
            UpdateCarPosition(carData.id, carData.position, carData.stopped);
        }
    }
}`,
				},
				{
					title: "Multi-Phase Traffic Light System",
					language: "python",
					code: `# 7-Phase Traffic Light Coordination System
phases = [
    # Phase 1: North-South through traffic
    {'north': 'green', 'south': 'green', 'east': 'red', 'west': 'red',
     'north_left': 'red', 'south_left': 'red', 'east_left': 'red', 'west_left': 'red',
     'duration': 30.0},

    # Phase 2: North-South yellow transition
    {'north': 'yellow', 'south': 'yellow', 'east': 'red', 'west': 'red',
     'north_left': 'red', 'south_left': 'red', 'east_left': 'red', 'west_left': 'red',
     'duration': 3.0},

    # Phase 3: North-South protected left turn
    {'north': 'red', 'south': 'red', 'east': 'red', 'west': 'red',
     'north_left': 'green', 'south_left': 'green', 'east_left': 'red', 'west_left': 'red',
     'duration': 15.0},

    # Phase 4: East-West through traffic
    {'north': 'red', 'south': 'red', 'east': 'green', 'west': 'green',
     'north_left': 'red', 'south_left': 'red', 'east_left': 'red', 'west_left': 'red',
     'duration': 30.0},

    # Phase 5: East-West yellow transition
    {'north': 'red', 'south': 'red', 'east': 'yellow', 'west': 'yellow',
     'north_left': 'red', 'south_left': 'red', 'east_left': 'red', 'west_left': 'red',
     'duration': 3.0},

    # Phase 6: East-West protected left turn
    {'north': 'red', 'south': 'red', 'east': 'red', 'west': 'red',
     'north_left': 'red', 'south_left': 'red', 'east_left': 'green', 'west_left': 'green',
     'duration': 15.0},

    # Phase 7: All red clearance interval
    {'north': 'red', 'south': 'red', 'east': 'red', 'west': 'red',
     'north_left': 'red', 'south_left': 'red', 'east_left': 'red', 'west_left': 'red',
     'duration': 2.0}
]

class TrafficController:
    def __init__(self, lights, phases):
        self.lights = lights
        self.phases = phases
        self.current_phase = 0
        self.timer = 0.0
        self.apply_phase(self.phases[0])`,
				},
				{
					title: "Complex Diagonal Lane Agent Behavior",
					language: "python",
					code: `class DiagonalLaneAgent(ap.Agent):
    def setup(self, start_pos, target_pos, lane_type='diagonal'):
        self.position = np.array(start_pos, dtype=float)
        self.target = np.array(target_pos, dtype=float)
        self.lane_type = lane_type
        self.speed = 1.2
        self.stopped = False
        self.direction_vector = self.calculate_direction()

    def calculate_direction(self):
        """Calculate normalized direction vector for diagonal movement"""
        diff = self.target - self.position
        distance = np.linalg.norm(diff)
        return diff / distance if distance > 0 else np.array([0.0, 0.0])

    def step(self, lights, other_agents):
        # Check if approaching intersection
        intersection_center = np.array([0.0, 0.0])
        dist_to_intersection = np.linalg.norm(self.position - intersection_center)

        # Determine which light controls this diagonal lane
        angle = np.arctan2(self.direction_vector[1], self.direction_vector[0])
        controlling_light = self.get_controlling_light(angle, lights)

        # Check for conflicts with other agents
        should_stop = self.check_conflicts(other_agents, dist_to_intersection)

        # Update stopped state based on light and conflicts
        near_intersection = 15.0 < dist_to_intersection < 25.0
        self.stopped = (controlling_light.state in ['red', 'yellow'] and near_intersection) or should_stop

        if not self.stopped:
            # Move along diagonal path
            self.position += self.direction_vector * self.speed

    def check_conflicts(self, other_agents, my_dist):
        """Check for potential collisions with other agents"""
        for agent in other_agents:
            if agent == self:
                continue
            distance = np.linalg.norm(self.position - agent.position)
            if distance < 5.0 and agent.position[1] > self.position[1]:
                return True
        return False`,
				},
			],
			images: [
				"/Semex1.png",
				"/Semex2.png",
				"/Semex3.png",
			],
			videos: ["https://www.youtube.com/embed/cczH2BlqSEc"],
		},
		credifiel: {
			overview: `The Credifiel Datathon project focused on optimizing collection strategies for credit recovery.
			Using advanced data analysis and machine learning techniques, we developed an automation model that significantly improved recovery efficiency.
			By analyzing historical data and identifying patterns, we reduced ineffective strategies from 25 to 13, increasing recovery success by 18%.
			This achievement earned us 2nd place among 100 national teams in the competition.`,
			features: [
				"Advanced data analysis for credit recovery optimization",
				"Machine learning models for strategy effectiveness prediction",
				"Reduced ineffective strategies from 25 to 13",
				"18% increase in recovery success rate",
				"Automated decision-making system for collection strategies",
				"Data visualization dashboards for strategy performance",
			],
			tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "SQL", "Jupyter"],
			codeSnippets: [
				{
					title: "Strategy Effectiveness Analysis",
					language: "python",
					code: `import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

class StrategyAnalyzer:
    def __init__(self, data):
        self.data = data
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)

    def analyze_strategies(self):
        # Feature engineering
        features = self.data[['strategy_type', 'contact_attempts', 'payment_history',
                              'debt_amount', 'customer_segment']]
        target = self.data['recovery_success']

        # Encode categorical variables
        features_encoded = pd.get_dummies(features)

        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            features_encoded, target, test_size=0.2, random_state=42
        )

        # Train model
        self.model.fit(X_train, y_train)

        # Get feature importance
        importance = pd.DataFrame({
            'strategy': features_encoded.columns,
            'importance': self.model.feature_importances_
        }).sort_values('importance', ascending=False)

        return importance`,
				},
				{
					title: "Strategy Optimization Algorithm",
					language: "python",
					code: `def optimize_strategies(strategies_df, min_success_rate=0.65):
    """
    Optimize collection strategies by removing ineffective ones
    and recommending the best approach for each customer segment
    """
    # Calculate success rate per strategy
    strategy_performance = strategies_df.groupby('strategy_id').agg({
        'recovery_success': 'mean',
        'cost': 'mean',
        'duration_days': 'mean'
    }).reset_index()

    # Calculate efficiency score (success rate / cost)
    strategy_performance['efficiency'] = (
        strategy_performance['recovery_success'] /
        strategy_performance['cost']
    )

    # Filter effective strategies
    effective_strategies = strategy_performance[
        strategy_performance['recovery_success'] >= min_success_rate
    ].sort_values('efficiency', ascending=False)

    print(f"Reduced strategies from {len(strategy_performance)} to {len(effective_strategies)}")
    print(f"Average success rate improved by {(effective_strategies['recovery_success'].mean() - strategy_performance['recovery_success'].mean()) * 100:.1f}%")

    return effective_strategies`,
				},
			],
			images: [
				"https://via.placeholder.com/800x600/3498DB/FFFFFF?text=Data+Analysis",
				"https://via.placeholder.com/800x600/2980B9/FFFFFF?text=Strategy+Performance",
				"https://via.placeholder.com/800x600/5DADE2/FFFFFF?text=ML+Predictions",
			],
			videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
		},
		awaq: {
			overview: `AWAQ is a comprehensive web platform designed to promote environmental preservation and social impact.
			The project features a full-stack implementation with a REST API backend using MySQL for data management,
			and a modern React frontend with an integrated Unity-based educational video game.
			The platform aims to raise environmental awareness and provide interactive educational content for users of all ages.`,
			features: [
				"REST API backend with MySQL database integration",
				"React-based frontend with modern JavaScript, HTML, and CSS",
				"Unity-based educational video game for environmental awareness",
				"Interactive learning modules about environmental preservation",
				"Social impact tracking and community engagement features",
				"Responsive design for accessibility across devices",
			],
			tech: ["React", "JavaScript", "Node.js", "Express", "MySQL", "Unity", "HTML", "CSS", "REST API"],
			codeSnippets: [
				{
					title: "Environmental Data API Endpoint",
					language: "javascript",
					code: `const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'awaq_db',
    waitForConnections: true,
    connectionLimit: 10
});

// Get environmental impact data
router.get('/api/impact/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const [rows] = await pool.execute(
            \`SELECT u.username, SUM(a.carbon_saved) as total_carbon_saved,
             SUM(a.trees_planted) as total_trees, COUNT(a.id) as total_actions
             FROM users u LEFT JOIN eco_actions a ON u.id = a.user_id
             WHERE u.id = ? GROUP BY u.id\`,
            [userId]
        );

        res.json({
            success: true,
            data: rows[0] || { total_carbon_saved: 0, total_trees: 0, total_actions: 0 }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;`,
				},
				{
					title: "React Environmental Dashboard",
					language: "javascript",
					code: `import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnvironmentalDashboard = ({ userId }) => {
    const [impactData, setImpactData] = useState(null);

    useEffect(() => {
        fetchImpactData();
    }, [userId]);

    const fetchImpactData = async () => {
        try {
            const response = await axios.get(\`/api/impact/\${userId}\`);
            setImpactData(response.data.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="dashboard">
            <h2>Your Environmental Impact</h2>
            <div className="impact-cards">
                <div className="card">
                    <h3>{impactData?.total_carbon_saved || 0} kg</h3>
                    <p>Carbon Saved</p>
                </div>
                <div className="card">
                    <h3>{impactData?.total_trees || 0}</h3>
                    <p>Trees Planted</p>
                </div>
            </div>
        </div>
    );
};`,
				},
			],
			images: [
				"https://via.placeholder.com/800x600/27AE60/FFFFFF?text=AWAQ+Platform",
				"https://via.placeholder.com/800x600/229954/FFFFFF?text=Environmental+Dashboard",
				"https://via.placeholder.com/800x600/1E8449/FFFFFF?text=Unity+Game",
				"https://via.placeholder.com/800x600/196F3D/FFFFFF?text=Impact+Tracking",
			],
			videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
		},
		iberdrola: {
			overview: `The Hackathon Iberdrola project focused on delivering affordable and sustainable energy to rural Oaxaca communities.
			Our team developed innovative technology solutions for energy access that benefited over 4,500 residents in underserved areas.
			The project emphasized scalability, inclusivity, and sustainable development, addressing the critical need for reliable electricity
			in rural Mexico. This comprehensive approach earned us 3rd place out of 40 national teams.`,
			features: [
				"Scalable energy distribution system for rural communities",
				"Solar-powered micro-grid implementation",
				"Mobile app for energy consumption monitoring",
				"Community-based energy management platform",
				"Cost-effective renewable energy solutions",
				"Benefited over 4,500 residents in rural Oaxaca",
			],
			tech: ["React", "Node.js", "MongoDB", "IoT", "Solar Energy Systems", "Mobile Development", "Data Analytics"],
			codeSnippets: [
				{
					title: "Energy Monitoring System",
					language: "javascript",
					code: `const mongoose = require('mongoose');

const EnergySchema = new mongoose.Schema({
    community_id: { type: String, required: true, index: true },
    household_id: String,
    timestamp: { type: Date, default: Date.now, index: true },
    consumption_kwh: Number,
    solar_generation_kwh: Number,
    grid_usage_kwh: Number,
    battery_level: Number,
    cost_savings: Number
});

EnergySchema.statics.getCommunityStats = async function(communityId, startDate, endDate) {
    return this.aggregate([
        {
            $match: {
                community_id: communityId,
                timestamp: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: '$community_id',
                total_consumption: { $sum: '$consumption_kwh' },
                total_solar: { $sum: '$solar_generation_kwh' },
                total_savings: { $sum: '$cost_savings' },
                households: { $addToSet: '$household_id' }
            }
        }
    ]);
};

module.exports = mongoose.model('Energy', EnergySchema);`,
				},
			],
			images: [
				"https://via.placeholder.com/800x600/F39C12/FFFFFF?text=Solar+Infrastructure",
				"https://via.placeholder.com/800x600/E67E22/FFFFFF?text=Community+Dashboard",
				"https://via.placeholder.com/800x600/D68910/FFFFFF?text=Energy+Monitoring",
			],
			videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
		},
	};

	const data = projectData[id] || {};

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${project.title} | ${INFO.main.title}`}</title>
				<meta name="description" content={project.description} />
				{currentSEO && (
					<meta
						name="keywords"
						content={currentSEO.keywords.join(", ")}
					/>
				)}
			</Helmet>

			<div className="page-content">
				<NavBar active="projects" />
				<div className="content-wrapper">
					<div className="project-detail-logo-container">
						<div className="project-detail-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="project-detail-container">
						<div className="project-detail-header">
							<h1 className="project-detail-title">{project.title}</h1>
							<p className="project-detail-subtitle">{project.description}</p>
						</div>

						{/* Overview Section */}
						<section className="project-section">
							<h2 className="section-title">Overview</h2>
							<p className="section-content">{data.overview}</p>
						</section>

						{/* Features Section */}
						{data.features && (
							<section className="project-section">
								<h2 className="section-title">Key Features</h2>
								<ul className="features-list">
									{data.features.map((feature, index) => (
										<li key={index} className="feature-item">
											{feature}
										</li>
									))}
								</ul>
							</section>
						)}

						{/* Tech Stack Section */}
						{data.tech && (
							<section className="project-section">
								<h2 className="section-title">Technology Stack</h2>
								<div className="tech-stack">
									{data.tech.map((tech, index) => (
										<span key={index} className="tech-badge">
											{tech}
										</span>
									))}
								</div>
							</section>
						)}

						{/* Code Snippets Section */}
						{data.codeSnippets && (
							<section className="project-section">
								<h2 className="section-title">Code Highlights</h2>
								{data.codeSnippets.map((snippet, index) => (
									<div key={index} className="code-snippet-container">
										<h3 className="code-snippet-title">{snippet.title}</h3>
										<div className="code-snippet">
											<pre>
												<code className={`language-${snippet.language}`}>
													{snippet.code}
												</code>
											</pre>
										</div>
									</div>
								))}
							</section>
						)}

						{/* Screenshots Section */}
						{data.images && (
							<section className="project-section">
								<h2 className="section-title">Screenshots</h2>
								<div className="screenshots-grid">
									{data.images.map((image, index) => (
										<div key={index} className="screenshot-item">
											<img
												src={image}
												alt={`${project.title} screenshot ${index + 1}`}
												className="screenshot-image"
											/>
										</div>
									))}
								</div>
							</section>
						)}

						{/* Videos Section */}
						{data.videos && (
							<section className="project-section">
								<h2 className="section-title">Demo Videos</h2>
								<div className="videos-container">
									{data.videos.map((video, index) => (
										<div key={index} className="video-wrapper">
											{video.startsWith('http') ? (
												<iframe
													src={video}
													title={`${project.title} demo video ${index + 1}`}
													frameBorder="0"
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
													allowFullScreen
													className="video-iframe"
												></iframe>
											) : (
												<video
													controls
													className="video-iframe"
													preload="metadata"
												>
													<source src={video} type="video/quicktime" />
													<source src={video} type="video/mp4" />
													Your browser does not support the video tag.
												</video>
											)}
										</div>
									))}
								</div>
							</section>
						)}

						{/* QR Code Section */}
						{data.qrCode && (
							<section className="project-section">
								<h2 className="section-title">Try Me!</h2>
								<div className="qr-code-container">
									<p className="qr-code-description">
										Scan the QR code below to access the web app
									</p>
									<div className="qr-code-wrapper">
										<img
											src={data.qrCode}
											alt={`${project.title} QR Code`}
											className="qr-code-image"
										/>
									</div>
								</div>
							</section>
						)}

						<div className="page-footer">
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ProjectDetail;
