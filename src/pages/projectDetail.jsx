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
					title: "Gemini Vision API Integration",
					language: "swift",
					code: `class GeminiAPI {
    private let apiKey = "YOUR_GEMINI_API_KEY"
    private let endpoint = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent"

    func scanProductLabel(image: UIImage) async throws -> ProductScanResult {
        guard let imageData = image.jpegData(compressionQuality: 0.8) else {
            throw GeminiError.imageConversionFailed
        }

        let base64Image = imageData.base64EncodedString()

        let prompt = """
        Analyze this product label and extract:
        1. Product name
        2. Product ID/SKU
        3. Expiry date
        4. LOT number
        5. Quantity
        6. Weight/volume
        """

        let request = GeminiRequest(
            contents: [
                Content(
                    parts: [
                        Part(text: prompt),
                        Part(inlineData: InlineData(
                            mimeType: "image/jpeg",
                            data: base64Image
                        ))
                    ]
                )
            ]
        )

        // Make API call and parse response
        let response = try await makeAPICall(request)
        return parseProductData(response)
    }
}`,
				},
				{
					title: "SwiftUI Dashboard View",
					language: "swift",
					code: `struct ExpiryDashboardView: View {
    @StateObject private var viewModel = ExpiryViewModel()
    @State private var showScanner = false

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Header with stats
                StatsCardView(
                    criticalCount: viewModel.criticalItems.count,
                    warningCount: viewModel.warningItems.count,
                    totalSavings: viewModel.calculateSavings()
                )

                // Scan button
                Button(action: { showScanner = true }) {
                    HStack {
                        Image(systemName: "camera.fill")
                        Text("Scan Product Label")
                    }
                    .frame(maxWidth: .infinity)
                }
                .buttonStyle(.borderedProminent)

                // Critical items list
                if !viewModel.criticalItems.isEmpty {
                    SectionHeader(title: "Critical - Expiring Today")
                    ForEach(viewModel.criticalItems) { item in
                        ProductCard(product: item, status: .critical)
                    }
                }

                // Warning items list
                if !viewModel.warningItems.isEmpty {
                    SectionHeader(title: "Warning - Expiring Within 7 Days")
                    ForEach(viewModel.warningItems) { item in
                        ProductCard(product: item, status: .warning)
                    }
                }
            }
            .padding()
        }
        .sheet(isPresented: $showScanner) {
            CameraScannerView(viewModel: viewModel)
        }
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
			videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
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
			overview: `HeatShield is an iOS safety and emergency response application built with SwiftUI and Firebase.
			The app provides real-time monitoring and alert capabilities to keep users safe and informed during critical situations.
			It features instant notifications, location tracking, and emergency contact management.`,
			features: [
				"Real-time safety alerts and notifications",
				"Emergency contact management system",
				"Location-based services for incident reporting",
				"Firebase Cloud Messaging for instant alerts",
				"SwiftUI-based modern and responsive interface",
			],
			tech: ["Swift", "SwiftUI", "Firebase", "Firebase Cloud Messaging", "Core Location", "UserNotifications"],
			codeSnippets: [
				{
					title: "Firebase Configuration",
					language: "swift",
					code: `import SwiftUI
import FirebaseCore

@main
struct HeatShieldApp: App {
    init() {
        FirebaseApp.configure()
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}`,
				},
				{
					title: "Emergency Alert Manager",
					language: "swift",
					code: `class EmergencyAlertManager: ObservableObject {
    @Published var activeAlerts: [Alert] = []
    @Published var emergencyContacts: [Contact] = []

    func sendEmergencyAlert(type: AlertType, location: CLLocation) {
        let alert = Alert(
            type: type,
            location: location,
            timestamp: Date()
        )

        // Send to Firebase
        sendToFirebase(alert)

        // Notify emergency contacts
        notifyContacts(alert)

        // Update local state
        activeAlerts.append(alert)
    }

    private func notifyContacts(_ alert: Alert) {
        emergencyContacts.forEach { contact in
            let message = """
            Emergency Alert: \\(alert.type.rawValue)
            Location: \\(alert.location.coordinate.latitude), \\(alert.location.coordinate.longitude)
            Time: \\(alert.timestamp.formatted())
            """

            sendSMS(to: contact.phoneNumber, message: message)
        }
    }
}`,
				},
			],
			images: [
				"https://via.placeholder.com/800x600/EF4444/FFFFFF?text=HeatShield+Home",
				"https://via.placeholder.com/800x600/F97316/FFFFFF?text=Alert+System",
				"https://via.placeholder.com/800x600/DC2626/FFFFFF?text=Emergency+Contacts",
			],
			videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
		},
		wuno: {
			overview: `WUNO is a FIFA World Cup 2026 companion app built with SwiftUI and SwiftData.
			The application provides comprehensive tournament information, match tracking, and AI-powered insights using Apple's Foundation Models.
			It features App Shortcuts integration for quick access to match information and supports all World Cup 2026 matches across USA, Canada, and Mexico.`,
			features: [
				"Complete World Cup 2026 match schedule and tracking",
				"AI-powered match insights using Foundation Models",
				"App Shortcuts integration for Siri commands",
				"SwiftData for efficient local data management",
				"Real-time match updates and notifications",
				"Venue information for stadiums across North America",
			],
			tech: ["Swift", "SwiftUI", "SwiftData", "App Intents", "Foundation Models", "App Shortcuts"],
			codeSnippets: [
				{
					title: "SwiftData Model Definition",
					language: "swift",
					code: `import SwiftData
import Foundation

@Model
class Match {
    var id: String
    var title: String
    var matchDescription: String
    var date: Date
    var teams: [String]
    var venueName: String
    var venueCity: String
    var venueCountry: String
    var importance: String

    init(id: String, title: String, description: String, date: Date,
         teams: [String], venueName: String, venueCity: String,
         venueCountry: String, importance: String) {
        self.id = id
        self.title = title
        self.matchDescription = description
        self.date = date
        self.teams = teams
        self.venueName = venueName
        self.venueCity = venueCity
        self.venueCountry = venueCountry
        self.importance = importance
    }
}`,
				},
				{
					title: "Foundation Model Integration",
					language: "swift",
					code: `import AppIntents

class FoundationModelManager {
    static let shared = FoundationModelManager()

    func prewarmModel() async {
        // Prewarm the model for better performance
        do {
            try await generateMatchInsights(for: "Sample match")
        } catch {
            print("Prewarm failed: \\(error)")
        }
    }

    func generateMatchInsights(for match: Match) async throws -> String {
        let prompt = """
        Analyze this World Cup match:
        \\(match.teams[0]) vs \\(match.teams[1])
        Venue: \\(match.venueName), \\(match.venueCity)
        Provide brief insights about this matchup.
        """

        // Use Foundation Model to generate insights
        let response = try await FoundationModelAPI.generateContent(prompt: prompt)
        return response
    }
}`,
				},
				{
					title: "App Shortcuts",
					language: "swift",
					code: `import AppIntents

struct GetNextMatchIntent: AppIntent {
    static var title: LocalizedStringResource = "Get Next Match"
    static var description = IntentDescription("Get information about the next World Cup match")

    func perform() async throws -> some IntentResult & ProvidesDialog {
        let dataManager = WUNODataManager.shared
        let upcomingMatches = dataManager.getUpcomingMatches(limit: 1)

        guard let nextMatch = upcomingMatches.first else {
            return .result(dialog: "No upcoming matches found")
        }

        let message = """
        Next Match: \\(nextMatch.title)
        \\(nextMatch.teams[0]) vs \\(nextMatch.teams[1])
        Date: \\(nextMatch.date.formatted())
        Venue: \\(nextMatch.venueName), \\(nextMatch.venueCity)
        """

        return .result(dialog: message)
    }
}`,
				},
			],
			images: [
				"https://via.placeholder.com/800x600/2563EB/FFFFFF?text=WUNO+Home+Screen",
				"https://via.placeholder.com/800x600/7C3AED/FFFFFF?text=Match+Schedule",
				"https://via.placeholder.com/800x600/DB2777/FFFFFF?text=AI+Insights",
				"https://via.placeholder.com/800x600/059669/FFFFFF?text=Venue+Information",
			],
			videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
		},
		kaapeh: {
			overview: `Kaapeh Mexico is an innovative iOS mobile application for coffee traceability using Blockchain technology.
			Developed in collaboration with a global team, this app ensures product quality and transparency throughout the coffee supply chain.
			By implementing blockchain-based tracking, Kaapeh allows consumers and producers to verify the authenticity and journey of their coffee from farm to cup.`,
			features: [
				"Blockchain-based coffee traceability for complete supply chain visibility",
				"Machine Learning integration for pattern detection and quality analysis",
				"SwiftData for efficient local data persistence",
				"Real-time quality metrics and certification tracking",
				"Global team collaboration with international coffee producers",
				"Transparent supply chain verification for consumers",
			],
			tech: ["Swift", "SwiftUI", "SwiftData", "Blockchain", "Machine Learning", "Core ML", "REST APIs"],
			codeSnippets: [
				{
					title: "Blockchain Transaction Model",
					language: "swift",
					code: `import SwiftData
import CryptoKit

@Model
class CoffeeTransaction {
    var id: UUID
    var timestamp: Date
    var blockHash: String
    var previousHash: String
    var coffeeID: String
    var origin: String
    var producer: String
    var certifications: [String]
    var qualityScore: Double

    init(coffeeID: String, origin: String, producer: String, certifications: [String], qualityScore: Double, previousHash: String) {
        self.id = UUID()
        self.timestamp = Date()
        self.coffeeID = coffeeID
        self.origin = origin
        self.producer = producer
        self.certifications = certifications
        self.qualityScore = qualityScore
        self.previousHash = previousHash
        self.blockHash = self.calculateHash()
    }

    func calculateHash() -> String {
        let data = "\\(id)\\(timestamp)\\(coffeeID)\\(origin)\\(producer)\\(previousHash)"
        let inputData = Data(data.utf8)
        let hashed = SHA256.hash(data: inputData)
        return hashed.compactMap { String(format: "%02x", $0) }.joined()
    }
}`,
				},
				{
					title: "ML Quality Analysis",
					language: "swift",
					code: `import CoreML
import Vision

class QualityAnalyzer {
    private let model: VNCoreMLModel

    init() throws {
        let config = MLModelConfiguration()
        let mlModel = try CoffeeQualityClassifier(configuration: config)
        self.model = try VNCoreMLModel(for: mlModel.model)
    }

    func analyzeQuality(image: UIImage) async throws -> QualityResult {
        guard let cgImage = image.cgImage else {
            throw QualityError.invalidImage
        }

        let request = VNCoreMLRequest(model: model)
        let handler = VNImageRequestHandler(cgImage: cgImage)

        try handler.perform([request])

        guard let results = request.results as? [VNClassificationObservation],
              let topResult = results.first else {
            throw QualityError.analysisFailed
        }

        return QualityResult(
            grade: topResult.identifier,
            confidence: topResult.confidence,
            defects: extractDefects(from: results)
        )
    }
}`,
				},
			],
			images: [
				"Kaffi1.png",
				"Kaffi2.png",
				"Kaffi3.png",
				"Kaffi4.png",
				"Kaffi5.png",
			],
			videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
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
				"Semex1.png",
				"Semex2.png",
				"Semex3.png",
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
											<iframe
												src={video}
												title={`${project.title} demo video ${index + 1}`}
												frameBorder="0"
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
												allowFullScreen
												className="video-iframe"
											></iframe>
										</div>
									))}
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
